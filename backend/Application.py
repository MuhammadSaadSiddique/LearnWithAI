import re
import torch
from huggingface_hub import InferenceClient
import requests
import os
from dotenv import load_dotenv

load_dotenv()

hf_api_key = os.environ.get('hf_api_key')
# hf_api_key="hf_**********"
num_questions=10
topic="Gravity"
grade="9"
Country="Pakistan"
prompt=f"Generate preassement  {num_questions} quiz questions on the topic: {topic} with choices with correct options for grade {grade}"
# generator = pipeline("text-generation", model="gpt2", use_auth_token=hf_api_key)

# Falcon Model setup

def Zephyr_propmt(propmt):
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


# # print(questions , correct_answers)

# question_blocks = re.split(r'\d+\. ', questions)
# print(question_blocks)
# # question_blocks=['', " What is the force that keeps objects close to the earth's surface and pulls objects toward each other?\na) Friction\nb) Magnetism\nc) Gravity\nd) Pressure\n\n", ' Who discovered the law of gravity?\na) Isaac Newton\nb) Galileo Galilei\nc) Albert Einstein\nd) Nikola Tesla\n\n', ' Which of the following can cause gravity?\na) Electric charge\nb) Magnetic charge\nc) Mass\nd) Color\n\n', " How does Earth's gravity affect objects?\na) Pushes them away\nb) Attracts them closer\nc) Stops them from moving\nd) Doesn't affect them at all\n\n", ' Which planet has the strongest gravity in the solar system?\na) Jupiter\nb) Saturn\nc) Mercury\nd) Venus\n\n', ' How does gravity impact space travel?\na) Makes it more dangerous\nb) Makes it easier\nc) Has no impact\nd) Makes it longer\n\n', ' How does the weight of an object differ from its mass?\na) Weight is measured in kilograms, while mass is measured in Newtons\nb) Weight is the force of gravity on an object, while mass is the amount of matter in an object\nc) Weight and mass are the same thing\nd) Weight is the distance between the earth and an object, while mass is its volume\n\n', ' What is a black hole?\na) A region in space where gravity is incredibly strong\nb) A small, compact star that is not visible\nc) A place where all matter is sucked into\nd) A type of star that explodes and releases a lot of energy\n\n', " How does gravity affect our daily lives?\na) By keeping objects on Earth's surface\nb) By making objects heavier or lighter\nc) By controlling the speed of objects\nd) By affecting the way we move\n\n", " Can gravity be changed or controlled by humans?\na) Yes, by using technology such as rocket engines and gravity drives\nb) No, gravity is a natural force that cannot be changed or controlled\nc) Sometimes, by adjusting objects' positions in space\nd) Only by scientists who understand the science of gravity. \n\n \nCorrect answers: 1) C, 2) A, 3) C, 4) B, 5) A, 6) B, 7) B, 8) A, 9) A, 10) B."]
# for question in question_blocks:
#     # qa = f"{question}\n"
#     # print(qa)
    
#     qae=re.split(r'\n', question)
#     print(qae)
# print(correct_answers)    
# if "Correct answers:" in correct_answers:
# 	ca = re.split(r'\d+\) ', correct_answers)
# 	print(ca)

# correct_answers = """Correct answers: 1) C, 2) A, 3) C, 4) B, 5) A, 6) B, 7) B, 8) A, 9) A, 10) B.Correct answers: 1) C, 2) A, 3) C, 4) B, 5) A, 6) B, 7) B, 8) A, 9) A, 10) B."""

import re
def generateQuiz():
	content=Zephyr_propmt(propmt=prompt)
	# # print(content)
	question , correct_answers=re.split(r'\n\n \n',content)
	pattern_question = r"(.+?\?)"
	pattern_options = r"[a-d]\) (.+)"
	questions = re.findall(pattern_question, question)
	options = re.findall(pattern_options, question)

	quiz=[]
	for i, question in enumerate(questions):
		Qblock={}
		Qblock[f"question {i+1}"]=question
		print(f"Question {i+1}: {question}")
		for j, option in enumerate(options[i*4:(i+1)*4], 1):
			print(f"  {chr(96+j)}) {option}")
			Qblock[f"option {j}"]= option
		# print(Qblock)
		quiz.append(Qblock)
	pattern = r"(\d+)\) ([A-D])"
	matches = re.findall(pattern, correct_answers)

	for match in matches:
		question_number = match[0]
		answer = match[1]
		print(f"Question {question_number}: {answer}")
		quiz[int(question_number)-1]["correct"]=answer
	print(quiz)