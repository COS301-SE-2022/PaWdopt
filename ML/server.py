from flask import Flask, jsonify, render_template, request
from werkzeug.utils import secure_filename
from flask_cors import CORS
import base64
import os
from breed_detector import breed_detector

app = Flask(__name__)
CORS(app)

detector = breed_detector()

@app.route('/')
def home():
    return jsonify({'message': 'server live'})

@app.route('/predict', methods=['POST'])
def predict():
    req = request.get_json(silent=True)
    b64 = req['data']+ ('=' * (len(req['data']) % 4))
    img_name = "uploads/image."+req['mimetype'].split('/')[1]
    img_name = secure_filename(img_name)
    with open(img_name, "wb") as new_file:
        new_file.write(base64.urlsafe_b64decode(b64))
    prediction = detector.evaluate_image(img_name)
    os.remove(img_name)
    breed = { "breed": prediction }
    return jsonify(breed)

@app.route('/predict', methods=['GET'])
def predict_message():
    response = {"test": "response works with get"}
    return jsonify(response)

@app.route('/train', methods=['GET'])
def train():
    detector.train_model()
    return "Model Training Completed"


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)