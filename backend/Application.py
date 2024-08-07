import re
import torch
from huggingface_hub import InferenceClient
import requests
import os
from dotenv import load_dotenv

load_dotenv()

hf_api_key = os.environ.get('hf_api_key')
# hf_api_key="hf_**********"
# generator = pipeline("text-generation", model="gpt2", use_auth_token=hf_api_key)

# Falcon Model setup

def Zephyr_propmt(prompt):
	client = InferenceClient(
		"HuggingFaceH4/zephyr-7b-beta",
		# "tiiuae/falcon-7b",
		token=hf_api_key
	)
	generated_response=""
	for message in client.chat_completion(
		messages=[{"role": "user", "content": prompt}],
		max_tokens=1000,
		stream=True,
	):
		generated_response+=message.choices[0].delta.content

	return generated_response
def AI71model(prompt):
	from ai71 import AI71
	import re
	generated_response=""
	AI71_API_KEY =os.environ.get('AI71_API_KEY')
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
def FalconModel(prompt):
	API_URL = "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct"
	headers = {"Authorization": "Bearer "+hf_api_key}

	def query(payload):
		response = requests.post(API_URL, headers=headers, json=payload)
		return response.json()
		
	output = query({
		"inputs": prompt,
	})
	print("------------------------------------------------------\n")
	print(output)

import re
def generateQuiz():
	num_questions=10
	topic="Gravity"
	grade="9"
	educationLvl="Primary"
	Country="Pakistan"
	prompt=f"Generate preassement  {num_questions} quiz questions on the topic: {topic} with choices with correct options for grade {grade} for education level {educationLvl} and give response in json"
	content=AI71model(prompt=prompt)
	print(content)
	
def generatePlan():
	import json
	topic="Gravity"
	grade="9"
	educationLvl="Primary"
	prompt=f"Generate learning plan on topic {topic} for grade {grade} for education level {educationLvl} and provide response in json"
	json_data=AI71model(prompt=prompt)
	data = json.loads(json_data)
	print(data)
	# for path in data["learning_plan"]:
	# 	prompt=f"Generate learning plan on activity {path} for grade {grade} with related video or text info give response in json"
	# 	content=AI71model(prompt=prompt)
	# 	print(content)
	# 	learnPath = json.loads(content)
	# 	path["resources"]=learnPath["resources"]
	# print(data)
# generatePlan()
# generateQuiz()
def generatePlanafterQuiz(Result):
	import json
	topic="Gravity"
	grade="9"
	educationLvl="Primary"
	prompt=f"Generate learning plan on topic {topic} for grade {grade} after evaluating result {Result} and provide response in json"
	print(prompt)
	json_data=AI71model(prompt=prompt)
	data = json.loads(json_data)
	print(data)
 
res="""[
    {
      "question": "What is the force that attracts two objects towards each other called?",
      "options": ["Gravity", "Magnetism", "Friction", "Static Electricity"],
      "answer": "Gravity",
	  "result":"Correct"
    },
    {
      "question": "What is the formula for calculating gravitational force?",
      "options": ["F = m * a", "F = m * g", "F = a * m", "F = g * m"],
      "answer": "F = m * g"	  ,
	  "result":"Correct"
    },
    {
      "question": "What is the value of the gravitational constant (G) in SI units?",
      "options": ["6.674 × 10^-11 N(m/kg)^2", "9.81 m/s^2", "1.62 × 10^-19 C", "3.00 × 10^8 m/s"],
      "answer": "6.674 × 10^-11 N(m/kg)^2",
	  "result":"incorrect"
    },
    {
      "question": "What is the relationship between mass and gravity?",
      "options": ["As mass increases, gravity decreases", "As mass increases, gravity increases", "There is no relationship between mass and gravity", "As mass decreases, gravity increases"],
      "answer": "As mass increases, gravity increases",
	  "result":"incorrect"
    },
    {
      "question": "What is the force of gravity between two objects with masses of 10 kg and 20 kg separated by a distance of 1 meter?",
      "options": ["0.49 N", "1.96 N", "9.81 N", "196 N"],
      "answer": "1.96 N",
	  "result":"Correct"
    },
    {
      "question": "What is the acceleration due to gravity on the surface of the Earth?",
      "options": ["9.81 m/s^2", "1.62 m/s^2", "3.00 m/s^2", "6.674 m/s^2"],
      "answer": "9.81 m/s^2",
	  "result":"Correct"
    },
    {
      "question": "What is the gravitational force between the Earth and the Moon?",
      "options": ["6.674 × 10^-11 N", "9.81 N", "1.98 × 10^20 N", "6.674 × 10^20 N"],
      "answer": "6.674 × 10^20 N",
	  "result":"Correct"
    },
    {
      "question": "What is the gravitational force between two objects with masses of 1 kg and 2 kg separated by a distance of 0.5 meters?",
      "options": ["0.49 N", "1.96 N", "9.81 N", "196 N"],
      "answer": "0.49 N",
	  "result":"Correct"
    },
    {
      "question": "What is the gravitational force between two objects with masses of 5 kg and 10 kg separated by a distance of 2 meters?",
      "options": ["0.98 N", "1.96 N", "9.81 N", "49 N"],
      "answer": "0.98 N",
	  "result":"incorrect"
    },
    {
      "question": "What is the gravitational force between two objects with masses of 100 kg and 200 kg separated by a distance of 5 meters?",
      "options": ["0.98 N", "1.96 N", "9.81 N", "196 N"],
      "answer": "1.96 N",
	  "result":"Correct"
    }
  ]"""
# generatePlanafterQuiz(res)
# generateQuiz()