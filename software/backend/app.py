from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)  # ✅ This creates the Flask application instance

# MongoDB Connection
client = MongoClient("mongodb+srv://cguhan03:guhan2003@cluster0.1mgs3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["Chat_app"]  # ✅ Database name
collection = db["user"]  # ✅ Collection name

@app.route("/")
def home():
    return "Flask Backend Running!"

@app.route("/data", methods=["GET"])
def get_data():
    data = list(collection.find({}, {"_id": 0}))  # ✅ Exclude `_id`
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)  # ✅ This ensures the app runs properly


