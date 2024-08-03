from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
import pandas as pd
import boto3
import os
import uuid
import re
from tqdm import tqdm
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
import torch

app = Flask(__name__)

ALLOWED_ORIGINS = [
    'https://brainjee.com',
    'https://sai-project.vercel.app',
    'https://vaisage.com',
    'http://localhost:3000/',
]

# MongoDB Connection
client = MongoClient('mongodb://localhost:27017/')
db = client.education_db

# MongoDB Collections
books_col = db.books
grades_col = db.grades
chapters_col = db.chapters
headings_col = db.headings
topics_col = db.topics
quizzes_col = db.quizzes
tasks_col = db.tasks

# DigitalOcean Spaces setup
DO_ACCESS_KEY_ID = 'your_do_access_key'
DO_SECRET_ACCESS_KEY = 'your_do_secret_key'
DO_REGION_NAME = 'your_do_region_name'  # e.g., 'nyc3'
DO_BUCKET_NAME = 'your_do_bucket_name'
DO_ENDPOINT_URL = f'https://{DO_REGION_NAME}.digitaloceanspaces.com'
session = boto3.Session(
    aws_access_key_id=DO_ACCESS_KEY_ID,
    aws_secret_access_key=DO_SECRET_ACCESS_KEY,
    region_name=DO_REGION_NAME
)
s3_client = session.client('s3', endpoint_url=DO_ENDPOINT_URL)

# Falcon Model setup
model_name = "tiiuae/falcon-7b"
tokenizer = AutoTokenizer.from_pretrained(model_name)
pipeline = pipeline(
    "text-generation",
    model=AutoModelForCausalLM.from_pretrained(model_name),
    tokenizer=tokenizer,
    torch_dtype=torch.bfloat16,
    trust_remote_code=True,
    device_map="auto"
)

def generate_content_and_quiz(topic_name):
    # Generate content with Falcon 7B
    prompt = f"Generate detailed content and quiz for the topic: {topic_name}"
    sequences = pipeline(
        prompt,
        max_length=500,
        do_sample=True,
        top_k=10,
        num_return_sequences=1,
        eos_token_id=tokenizer.eos_token_id,
    )
    content = sequences[0]['generated_text']
    
    # Mock quiz generation (you can replace this with real logic)
    quiz_questions = [
        {
            "question": f"What is the main concept of {topic_name}?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer": "Option A"
        },
        {
            "question": f"Why is {topic_name} important?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer": "Option B"
        }
    ]
    
    quiz = {"questions": quiz_questions}
    return content, quiz

def extract_values(csv_file):
    data = pd.read_csv(csv_file)
    DATA = {}
    for _, row in data.iterrows():
        book = row['Book']
        grade = row['Grade']
        chapter = row['Chapters']
        sub_heading = row['Sub Chapters']
        topic = row['Topics']

        if book not in DATA:
            DATA[book] = {}

        if grade not in DATA[book]:
            DATA[book][grade] = {}

        if chapter not in DATA[book][grade]:
            DATA[book][grade][chapter] = {}

        if sub_heading not in DATA[book][grade][chapter]:
            DATA[book][grade][chapter][sub_heading] = []

        DATA[book][grade][chapter][sub_heading].append(topic)

    return DATA

def store_to_mongodb(book, grade, chapter, heading, topic, content, quiz, video_link):
    # Upsert book and get its ID
    book_result = books_col.update_one({'name': book}, {'$setOnInsert': {'name': book}}, upsert=True)
    book_id = book_result.upserted_id or books_col.find_one({'name': book})['_id']

    # Upsert grade and get its ID
    grade_result = grades_col.update_one({'name': grade, 'book_id': book_id},
                                         {'$setOnInsert': {'name': grade, 'book_id': book_id}}, upsert=True)
    grade_id = grade_result.upserted_id or grades_col.find_one({'name': grade, 'book_id': book_id})['_id']

    # Upsert chapter and get its ID
    chapter_result = chapters_col.update_one({'name': chapter, 'grade_id': grade_id},
                                             {'$setOnInsert': {'name': chapter, 'grade_id': grade_id}}, upsert=True)
    chapter_id = chapter_result.upserted_id or chapters_col.find_one({'name': chapter, 'grade_id': grade_id})['_id']

    # Upsert heading and get its ID
    heading_result = headings_col.update_one({'name': heading, 'chapter_id': chapter_id},
                                             {'$setOnInsert': {'name': heading, 'chapter_id': chapter_id}}, upsert=True)
    heading_id = heading_result.upserted_id or headings_col.find_one({'name': heading, 'chapter_id': chapter_id})['_id']

    # Upsert topic and get its ID, including quiz and video_link
    topics_col.update_one(
        {'name': topic, 'heading_id': heading_id},
        {'$setOnInsert': {'name': topic, 'heading_id': heading_id, 'content': content, 'quiz': quiz,
                          'video_link': video_link}},
        upsert=True
    )

def retrieve_data_from_mongodb():
    all_data = {}
    books = books_col.find()
    for book in books:
        book_name = book['name']
        book_id = book['_id']
        all_data[book_name] = {}

        grades = grades_col.find({'book_id': book_id})
        for grade in grades:
            grade_name = grade['name']
            grade_id = grade['_id']
            all_data[book_name][grade_name] = {}

            chapters = chapters_col.find({'grade_id': grade_id})
            for chapter in chapters:
                chapter_name = chapter['name']
                chapter_id = chapter['_id']
                all_data[book_name][grade_name][chapter_name] = {}

                headings = headings_col.find({'chapter_id': chapter_id})
                for heading in headings:
                    heading_name = heading['name']
                    heading_id = heading['_id']
                    all_data[book_name][grade_name][chapter_name][heading_name] = {}

                    topics = topics_col.find({'heading_id': heading_id})
                    for topic in topics:
                        topic_name = topic['name']
                        topic_id = topic['_id']
                        topic_content = topic.get('content', '')
                        topic_video_link = topic.get('video_link', '')
                        quiz_content = topic.get('quiz', '')  # Directly retrieve quiz from the topic document
                        all_data[book_name][grade_name][chapter_name][heading_name][topic_name] = {
                            'content': topic_content,
                            'quiz': quiz_content,
                            'video_link': topic_video_link
                        }

    return all_data

def upload_to_digitalocean(video_file, book, grade, chapter, heading, topic):
    # Ensure all components are strings and remove any leading/trailing spaces
    book_str = str(book).strip()
    grade_str = str(grade).strip()
    chapter_str = str(chapter).strip()
    heading_str = str(heading).strip()
    topic_str = str(topic).strip()

    object_name = f"{book_str}/{grade_str}/{chapter_str}/{heading_str}/{topic_str}/{os.path.basename(video_file)}".replace(
        ',', '')
    object_name = object_name.replace(' ', '-')
    print('Object name:', object_name)

    # Check if the video file exists
    if not os.path.exists(video_file):
        print(f"Video file not found: {video_file}")
        return None

    try:
        s3_client.upload_file(video_file, DO_BUCKET_NAME, object_name)
        video_url = f"https://{DO_BUCKET_NAME}.{DO_ENDPOINT_URL}/{object_name}"
        return video_url
    except Exception as e:
        print(f"Error uploading {video_file} to DigitalOcean Spaces:", e)
        return None

def regenerate_content_quiz(topic_id_str):
    # Convert the string ID to ObjectId
    try:
        topic_id = ObjectId(topic_id_str)
    except Exception as e:
        print(f"Invalid ID format: {e}")
        return

    # Retrieve the topic from MongoDB
    topic_data = topics_col.find_one({'_id': topic_id})
    if not topic_data:
        print("Topic not found.")
        return

    # Retrieve the heading
    heading_id = topic_data.get('heading_id')
    heading_data = headings_col.find_one({'_id': heading_id})
    if not heading_data:
        print("Heading not found.")
        return
    heading_name = heading_data.get('name')

    # Retrieve the chapter
    chapter_id = heading_data.get('chapter_id')
    chapter_data = chapters_col.find_one({'_id': chapter_id})
    if not chapter_data:
        print("Chapter not found.")
        return
    chapter_name = chapter_data.get('name')

    # Retrieve the grade
    grade_id = chapter_data.get('grade_id')
    grade_data = grades_col.find_one({'_id': grade_id})
    if not grade_data:
        print("Grade not found.")
        return
    grade_name = grade_data.get('name')

    # Retrieve the book
    book_id = grade_data.get('book_id')
    book_data = books_col.find_one({'_id': book_id})
    if not book_data:
        print("Book not found.")
        return
    book_name = book_data.get('name')

    # Retrieve the topic name
    topic_name = topic_data.get('name')

    # Generate new content and quiz
    content, quiz = generate_content_and_quiz(topic_name)

    # Retrieve video link (if any)
    video_link = topic_data.get('video_link', '')

    # Update topic with new content and quiz
    topics_col.update_one(
        {'_id': topic_id},
        {'$set': {'content': content, 'quiz': quiz}}
    )

    return content, quiz, video_link

@app.route('/upload', methods=['POST'])
def upload():
    if request.method == 'POST':
        file = request.files['file']
        if file and file.filename.endswith('.csv'):
            filename = uuid.uuid4().hex + '.csv'
            file.save(os.path.join('uploads', filename))
            csv_file = os.path.join('uploads', filename)

            # Extract values from CSV and store to MongoDB
            data = extract_values(csv_file)
            for book, grades in data.items():
                for grade, chapters in grades.items():
                    for chapter, headings in chapters.items():
                        for heading, topics in headings.items():
                            for topic in topics:
                                # Generate content and quiz
                                content, quiz = generate_content_and_quiz(topic)

                                # Upload video to DigitalOcean Spaces
                                video_file = 'path_to_your_video_file.mp4'
                                video_link = upload_to_digitalocean(video_file, book, grade, chapter, heading, topic)

                                # Store data in MongoDB
                                store_to_mongodb(book, grade, chapter, heading, topic, content, quiz, video_link)

            return jsonify({'status': 'success'})
        else:
            return jsonify({'status': 'error', 'message': 'Invalid file type'}), 400

@app.route('/retrieve', methods=['GET'])
def retrieve():
    data = retrieve_data_from_mongodb()
    return jsonify(data)

@app.route('/regenerate', methods=['POST'])
def regenerate():
    topic_id_str = request.json.get('topic_id')
    content, quiz, video_link = regenerate_content_quiz(topic_id_str)
    if content is not None and quiz is not None:
        return jsonify({'content': content, 'quiz': quiz, 'video_link': video_link})
    else:
        return jsonify({'status': 'error', 'message': 'Failed to regenerate content and quiz'}), 500

if __name__ == '__main__':
    app.run(debug=True)
