from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import datetime
import bcrypt
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)  # ✅ This creates the Flask application instance
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# MongoDB Connection
client = MongoClient("mongodb+srv://cguhan03:guhan2003@cluster0.kavca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["Chat_app"]  # ✅ Database name
collection = db["user"]  # ✅ Collection name
messages_collection = db["messages"]
notices_collection=db["Notices"]
user_profiles = db["user_profile"]

# Register a New User
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")

    if not email or not username or not password:
        return jsonify({"error": "All fields are required!"}), 400

    # Check if user already exists
    existing_user = collection.find_one({"email": email})
    if existing_user:
        return jsonify({"error": "User already exists!"}), 409

    # Hash the password before storing it
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Insert user into MongoDB
    collection.insert_one({
        "email": email,
        "username": username,
        "password": hashed_password.decode('utf-8')  # Store as a string
    })

    return jsonify({"message": "User registered successfully!"}), 201

# User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required!"}), 400

    # Check if user exists
    user = collection.find_one({"email": email})
    if not user:
        return jsonify({"error": "Invalid email or password!"}), 401

    # Verify password
    if bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
        return jsonify({"message": "Login successful!", "username": user["username"]}), 200
    else:
        return jsonify({"error": "Invalid email or password!"}), 401


# Endpoint to create a new notice
@app.route('/create_notice', methods=['POST'])
def create_notice():
    data = request.get_json()
    notice = {
        "title": data.get("title"),
        "content": data.get("content"),
        "created_at": data.get("created_at"),  # You can use datetime here
        "filters": data["filters"],
        "username": data["username"],
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

# Fetch all registered users
@app.route('/all_users', methods=['GET'])
def get_users():
    users = collection.find({}, {"_id": 0, "username": 1})
    return jsonify(list(users))



# Fetch chat messages between two users
@app.route('/messages/<sender>/<receiver>', methods=['GET'])
def get_messages(sender, receiver):
    messages = messages_collection.find({
        "$or": [
            {"sender": sender, "receiver": receiver},
            {"sender": receiver, "receiver": sender}
        ]
    }).sort("timestamp", 1)  # Sort by timestamp in ascending order

    return jsonify([
        {
            "sender": msg["sender"],
            "receiver": msg["receiver"],
            "message": msg["message"],
            "timestamp": msg["timestamp"]
        } for msg in messages
    ])


# Send a new chat message
@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    sender = data["sender"]
    receiver = data["receiver"]
    message = data["message"]

    message_data = {
        "sender": sender,
        "receiver": receiver,
        "message": message,
        "timestamp": datetime.datetime.utcnow()
    }

    messages_collection.insert_one(message_data)
    return jsonify({"status": "Message sent successfully!"})

@app.route('/chat_users/<username>', methods=['GET'])
def get_chat_users(username):
    pipeline = [
        {"$match": {"$or": [{"sender": username}, {"receiver": username}]}},
        {"$sort": {"timestamp": -1}},  # Get latest messages first
        {"$group": {
            "_id": {"$cond": [{"$eq": ["$sender", username]}, "$receiver", "$sender"]},  # Chat partner
            "lastMessage": {"$first": "$message"},  # Latest message
            "timestamp": {"$first": "$timestamp"}
        }},
        {"$sort": {"timestamp": -1}}  # Sort by latest chat
    ]
    chat_users = list(messages_collection.aggregate(pipeline))
    
    return jsonify([
        {"username": chat["_id"], "lastMessage": chat["lastMessage"]}
        for chat in chat_users
    ])


# Directory to store uploaded images
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/build-profile", methods=["POST"])
def build_profile():
    try:
        email = request.form.get("email")  # ✅ Get registered user's email
        if not email:
            return jsonify({"error": "Email is required!"}), 400

        existing_user = user_profiles.find_one({"email": email})  # ✅ Check if user exists

        profile_data = {
            "name": request.form.get("name"),
            "dob": request.form.get("dob"),
            "interests": request.form.get("interests"),
            "college": request.form.get("college"),
            "university": request.form.get("university"),
            "location": request.form.get("location"),
            "department": request.form.get("department"),
            "degree": request.form.get("degree"),
            "course": request.form.get("course"),
            "year": request.form.get("year"),
        }

        if "photo" in request.files:
            photo = request.files["photo"]
            if photo.filename:
                filename = secure_filename(photo.filename)
                photo_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
                photo.save(photo_path)
                profile_data["photo"] = f"/uploads/{filename}"

        if existing_user:
            user_profiles.update_one({"email": email}, {"$set": profile_data})  # ✅ Update existing profile
        else:
            profile_data["email"] = email
            user_profiles.insert_one(profile_data)  # ✅ Insert new profile

        return jsonify({"message": "Profile saved successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)


