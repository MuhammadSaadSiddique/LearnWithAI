from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
import torch
hf_api_key="hf_**********"
num_questions=10
topic="Gravity"
grade="9"
Country="Pakistan"
prompt=f"Generate {num_questions} preassement quiz questions on the topic: {topic} with choices for grade {grade} in {Country}"
# generator = pipeline("text-generation", model="gpt2", use_auth_token=hf_api_key)

# Falcon Model setup

from huggingface_hub import InferenceClient

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

print(generated_response)

import requests

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