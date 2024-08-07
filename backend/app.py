from fastapi import FastAPI,Request, HTTPException
from pydantic import BaseModel, validator
import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient
import requests
from fastapi.middleware.cors import CORSMiddleware
import logging

load_dotenv()

ALLOWED_ORIGINS = [
    'http://localhost:5173/',
    'http://127.0.0.1:8000'
]
hf_api_key = os.environ.get('hf_api_key')
AI71_API_KEY = os.environ.get('AI71_API_KEY')

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
class QuizRequest(BaseModel):
    num_questions: int
    topic: str
    grade: str
    country: str
    educationLevel:str
    # result:str
    @validator('num_questions')
    def num_questions_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('num_questions must be a positive integer')
        return v

    @validator('topic', 'grade', 'country','educationLevel')
    def fields_must_not_be_empty(cls, v):
        if not v:
            raise ValueError('fields must not be empty')
        return v

def AI71model(prompt):
    from ai71 import AI71
    generated_response = ""
    for chunk in AI71(AI71_API_KEY).chat.completions.create(
        model="tiiuae/falcon-180b-chat",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
        stream=True,
    ):
        if chunk.choices[0].delta.content:
            generated_response += chunk.choices[0].delta.content
    return generated_response

@app.post("/generate_quiz" )
async def generate_quiz(request: QuizRequest):
    # json_data = await request.json()
    prompt = f"Generate preassessment {request.num_questions} quiz questions on the topic: {request.topic} with choices with correct options for grade {request.grade}  for education level {request.educationLevel}  in {request.country} and give response in json"
    content = AI71model(prompt=prompt)
    return {"quiz": content}
@app.post("/generate_lesson_plan" )
def generate_lesson_plan(request: QuizRequest):
    prompt = f"Generate learning plan on topic {request.topic} for grade {request.grade} for education level {request.educationLevel} and provide response in json"
    content = AI71model(prompt=prompt)
    return content
@app.post("/generate_lesson_plan_afterQuiz" )
def generate_lesson_plan_afterQuiz(request: QuizRequest):
    prompt = f"Generate learning plan on topic {request.topic} for grade {request.grade} for education level {request.educationLevel} after evaluating result {request.Result} and provide response in json"
    content = AI71model(prompt=prompt)
    return content

@app.post("/items/")
async def create_item(request: Request):
    json_data = await request.json()
    return json_data
@app.get("/")
def read_root():
    return {"message": "Welcome to the Quiz Generator API"}
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)