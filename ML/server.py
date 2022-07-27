from flask import Flask, jsonify, render_template, request
import os
from werkzeug.utils import secure_filename
import tensorflow as tf
from tensorflow import keras
from breed_detector import breed_detector

app = Flask(__name__)

detector = breed_detector()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['image']
    filename = secure_filename(file.filename)
    file.save("uploads/"+filename)

    prediction = detector.evaluate_image("uploads/"+filename)
    os.remove("uploads/"+filename)
    breed = { "breed": prediction }
    return jsonify(breed)

@app.route('/train', methods=['GET'])
def train():
    detector.train_model()
    return "Model Training Completed"


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)