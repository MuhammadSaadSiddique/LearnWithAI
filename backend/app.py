from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient
import requests

load_dotenv()

hf_api_key = os.environ.get('hf_api_key')
AI71_API_KEY = os.environ.get('AI71_API_KEY')

app = FastAPI()

class QuizRequest(BaseModel):
    num_questions: int
    topic: str
    grade: str
    country: str

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

@app.post("/generate_quiz")
def generate_quiz(request: QuizRequest):
    prompt = f"Generate preassessment {request.num_questions} quiz questions on the topic: {request.topic} with choices with correct options for grade {request.grade} in {request.country} and give response in json"
    content = AI71model(prompt=prompt)
    return {"quiz": content}

@app.get("/")
def read_root():
    return {"message": "Welcome to the Quiz Generator API"}
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)