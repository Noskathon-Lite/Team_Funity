from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama

app = Flask(__name__)
CORS(app)

@app.route('/api/users', methods=['POST'])
def add_user():
    data = request.json
    fullname = data.get('fullname')
    forbid="You are a nature expert focused on the environment, climate actions, and sustainability. Please limit responses to topics about nature, wildlife, climate change, conservation, and environmental protection only."
    # Validate inputs
    if not fullname:
        return jsonify({"error": "All fields are required"}), 400

    try:
        response = ollama.chat(
            model="llama3.2",
            messages=[{
                "role": "user",
                "content": f"{forbid} The question is: {fullname}",
            }]
        )
        print(response['message']['content'])
        return jsonify({"message": "User successfully registered!"}), 201
    except Exception as e:
        return (jsonify({"error": str(e)}), 500)

if __name__ == '__main__':
    app.run(debug=True)
