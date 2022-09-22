import functions_framework
import os
import base64
from breed_detector import breed_detector

detector = breed_detector()

@functions_framework.http
def predict(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    """
    request_json = request.get_json(silent=True)
    request_args = request.args

    if request_json and 'image' in request_json:
        image = request_json['image']
        extension = request_json['extension']
    elif request_args and 'name' in request_args:
        image = request_args['image']
        extension = request_json['extension']

    else:
        return 'Error, Image not specified'

    b64 = image.encode('ascii')
    img_name = "/tmp/image."+extension
    with open(img_name, "wb") as new_file:
        new_file.write(base64.decodebytes(b64))
    prediction = detector.evaluate_image(img_name)
    os.remove(img_name)
    breed = { "breed": prediction }
    return jsonify(breed)