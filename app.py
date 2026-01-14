from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect("feedback.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/submit", methods=["POST"])
def submit():
    data = request.get_json()

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    if len(name) < 3:
        return jsonify({"msg": "Invalid name"}), 400

    if "@" not in email or "." not in email:
        return jsonify({"msg": "Invalid email"}), 400

    if len(message) < 5:
        return jsonify({"msg": "Message too short"}), 400

    conn = get_db_connection()
    conn.execute(
        "INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)",
        (name, email, message)
    )
    conn.commit()
    conn.close()

    return jsonify({"msg": "Feedback stored successfully!"})

if __name__ == "__main__":
    app.run(debug=True)
