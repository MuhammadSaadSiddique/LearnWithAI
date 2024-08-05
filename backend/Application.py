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
	Country="Pakistan"
	prompt=f"Generate preassement  {num_questions} quiz questions on the topic: {topic} with choices with correct options for grade {grade} and give response in json"
	content=AI71model(prompt=prompt)
	print(content)
	
def generatePlan():
	import json
	topic="Comuter Science"
	grade="9"
	prompt=f"Generate learning plan on topic {topic} for grade {grade} with give response in json"
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