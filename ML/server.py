from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import base64
import os
from breed_detector import breed_detector

app = Flask(__name__)
CORS(app)

detector = breed_detector()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    b64 = request.form['image'].encode('ascii')
    img_name = "uploads/image."+request.form['extension']
    with open(img_name, "wb") as new_file:
        new_file.write(base64.decodebytes(b64))

    prediction = detector.evaluate_image(img_name)
    os.remove(img_name)
    breed = { "breed": prediction }
    return jsonify(breed)

@app.route('/train', methods=['GET'])
def train():
    detector.train_model()
    return "Model Training Completed"


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)