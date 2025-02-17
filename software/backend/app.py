from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)  # ✅ This creates the Flask application instance
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
# MongoDB Connection
client = MongoClient("mongodb+srv://cguhan03:guhan2003@cluster0.kavca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["Chat_app"]  # ✅ Database name
collection = db["user"]  # ✅ Collection name
notices_collection=db["Notices"]

# Endpoint to create a new notice
@app.route('/create_notice', methods=['POST'])
def create_notice():
    data = request.get_json()
    notice = {
        "title": data.get("title"),
        "content": data.get("content"),
        "created_at": data.get("created_at")  # You can use datetime here
    }
    
    # Insert notice into the MongoDB collection
    result = notices_collection.insert_one(notice)
    
    return jsonify({"message": "Notice created", "notice_id": str(result.inserted_id)}), 201

# Endpoint to fetch all notices
@app.route('/notices', methods=['GET'])
def get_notices():
    notices = list(notices_collection.find())  # Fetch all notices
    
    # Convert _id to string for JSON serialization
    for notice in notices:
        notice['_id'] = str(notice['_id'])
    
    return jsonify(notices)

if __name__ == "__main__":
    app.run(debug=True)


