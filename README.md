# LearnWithAI

## Overview

The Education Content Management System is a Flask-based web application designed to manage educational content, including books, grades, chapters, headings, and topics. The application uses MongoDB for data storage, DigitalOcean Spaces for video file storage, and Falcon LLM for content and quiz generation.

## Features

- **Upload CSV Data**: Import educational data from CSV files.
- **Generate Content and Quizzes**: Automatically generate detailed content and quizzes for educational topics using Falcon LLM.
- **Store and Retrieve Data**: Store and retrieve structured data in MongoDB.
- **Video Storage**: Upload and manage educational videos using DigitalOcean Spaces.
- **Regenerate Content**: Update content and quizzes for specific topics.

## Technologies

- **Backend**: Flask
- **Database**: MongoDB
- **Video Storage**: DigitalOcean Spaces
- **Content Generation**: Falcon LLM (via Hugging Face Transformers)
- **Python Libraries**: `pandas`, `boto3`, `transformers`, `torch`, `flask`, `pymongo`

## Prerequisites

1. **Python**: Ensure Python 3.8 or higher is installed.
2. **Virtual Environment**: Recommended for managing dependencies.
3. **MongoDB**: Running instance of MongoDB.
4. **DigitalOcean Spaces**: DigitalOcean Spaces account and credentials.

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. **Create and Activate a Virtual Environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the root directory and add the following variables:

   ```ini
   DO_ACCESS_KEY_ID=your_do_access_key
   DO_SECRET_ACCESS_KEY=your_do_secret_key
   DO_REGION_NAME=your_do_region_name
   DO_BUCKET_NAME=your_do_bucket_name
   ```

5. **Run the Application**

   ```bash
   python app.py
   ```

   The application will be available at `http://127.0.0.1:5000`.

## API Endpoints

### 1. Upload Data

- **Endpoint**: `/upload`
- **Method**: `POST`
- **Description**: Upload a CSV file to import educational data.
- **Form Data**:
  - `file`: CSV file to upload.

### 2. Retrieve Data

- **Endpoint**: `/retrieve`
- **Method**: `GET`
- **Description**: Retrieve all stored educational data.

### 3. Regenerate Content and Quiz

- **Endpoint**: `/regenerate`
- **Method**: `POST`
- **Description**: Regenerate content and quizzes for a specific topic.
- **Request Body**:
  - `topic_id`: ID of the topic to regenerate.

## CSV File Format

The CSV file used for uploading data should have the following columns:

- `Book`
- `Grade`
- `Chapters`
- `Sub Chapters`
- `Topics`

## Error Handling

- Ensure CSV file format is correct.
- Check DigitalOcean Spaces credentials and bucket configuration.
- Handle potential issues with Falcon LLM API and model availability.

## Contributing

Feel free to submit issues and pull requests. Contributions to improve the system are welcome!
