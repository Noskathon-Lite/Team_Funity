from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama

app = Flask(__name__)  # This initializes the app instance
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001"])

@app.route('/api/users', methods=['POST'])
def add_user():
    data = request.json
    ask = data.get('ask')
    forbid = "You are a nature expert focused on the environment, climate actions, and sustainability. Please limit responses to topics about nature, wildlife, climate change, conservation, and environmental protection only."
    
    if not ask:
        return jsonify({"error": "All fields are required"}), 400
    
    try:
        response = ollama.chat(
            model="llama3.2",
            messages=[{
                "role": "user",
                "content": f"{forbid} The question is: {ask}",
            }]
        )
        print(response['message']['content'])
        return jsonify({"answer": response['message']['content']})
    except Exception as e:
        print(str(e))
        return jsonify({"error": "An error occurred"}), 500

if __name__ == '__main__':
    app.run(debug=True)  # This ensures the app runs when the script is executed
