from gc import callbacks
import logging
import os

import tensorflow as tf
from tensorflow import keras
from keras import layers
import tensorflow_datasets as tfds

# Model Configuration
IMG_WIDTH = 299
INPUT_SHAPE = (IMG_WIDTH, IMG_WIDTH, 3)
BATCH_SIZE = 32
NUM_CLASSES = 0
CONCRETE_INPUT = "image_bytes"

DATA_AUGMENTATION = keras.models.Sequential(
        [
            keras.Input(shape=INPUT_SHAPE),
            layers.RandomFlip("horizontal"),
            layers.RandomRotation(0.1),
        ],
        name="Data_Augmentation"
    )

# Define Base Model
BASE_MODEL = keras.applications.Xception(
    weights='imagenet',  # Load weights pre-trained on ImageNet.
    input_shape=INPUT_SHAPE,
    include_top=False
)
BASE_MODEL.trainable = False # Fix pretrained layers



def normalize_img(image):
    """Normalizes image.

    * Resizes image to IMG_WIDTH x IMG_WIDTH pixels
    * Casts values from `uint8` to `float32`
    * Scales values from [0, 255] to [0, 1]

    Returns:
      A tensor with shape (IMG_WIDTH, IMG_WIDTH, 3). (3 color channels)
    """
    image = tf.image.resize_with_pad(image, IMG_WIDTH, IMG_WIDTH)
    return image / 255.


def normalize_img_and_label(image, label):
    """Normalizes image and label.

    * Performs normalize_img on image
    * Passes through label unchanged

    Returns:
      Tuple (image, label) where
      * image is a tensor with shape (IMG_WIDTH, IMG_WIDTH, 3). (3 color
        channels)
      * label is an unchanged integer representing dog breed
    """
    return normalize_img(image), label

# ! TODO Remember to remove
os.environ['AIP_MODEL_DIR'] = './models/'

if 'AIP_MODEL_DIR' not in os.environ:
    raise KeyError(
        'The `AIP_MODEL_DIR` environment variable has not been' +
        'set. See https://cloud.google.com/ai-platform-unified/docs/tutorials/image-recognition-custom/training'
    )
output_directory = os.environ['AIP_MODEL_DIR']

logging.info('Loading and preprocessing data ...')
dataset, info = tfds.load('stanford_dogs',
                    split='train',
                    try_gcs=True,
                    shuffle_files=True,
                    as_supervised=True,
                    with_info=True)
test_ds = tfds.load('stanford_dogs',
                    split='test',
                    try_gcs=True,
                    shuffle_files=True,
                    as_supervised=True)
dataset = dataset.map(normalize_img_and_label,
                      num_parallel_calls=tf.data.experimental.AUTOTUNE)
test_ds = test_ds.map(normalize_img_and_label,
                      num_parallel_calls=tf.data.experimental.AUTOTUNE)
dataset = dataset.cache()
NUM_CLASSES = len(info.features['label'].num_classes)
dataset = dataset.shuffle(1000)
dataset = dataset.batch(128)
dataset = dataset.prefetch(tf.data.experimental.AUTOTUNE)

def make_model(inputs, num_classes):
    """Creates a model based on the Xception architecture."""
    x=inputs

    # Entry flow
    x = layers.Conv2D(32, 3, strides=2, padding="same")(x)
    x = layers.BatchNormalization()(x)
    x = layers.LeakyReLU(alpha=0.3)(x)

    x = layers.Conv2D(64, 3, padding="same")(x)
    x = layers.BatchNormalization()(x)
    x = layers.LeakyReLU(alpha=0.3)(x)

    # First Residual
    previous_block_activation = x  

    # Increasing levels of Conv2D as in the entry flow of Xception
    for size in [128, 256, 512, 728]:
        x = layers.Dropout(0.05)(x)
        x = layers.LeakyReLU(alpha=0.3)(x)
        x = layers.SeparableConv2D(size, 3, padding="same")(x)
        x = layers.BatchNormalization()(x)

        x = layers.LeakyReLU(alpha=0.3)(x)
        x = layers.SeparableConv2D(size, 3, padding="same")(x)
        x = layers.BatchNormalization()(x)

        x = layers.MaxPooling2D(3, strides=2, padding="same")(x)

        # Project residual
        residual = layers.SeparableConv2D(size, 1, strides=2, padding="same")(previous_block_activation)
        x = layers.add([x, residual])  # Add residual from previous level
        previous_block_activation = x  # Set aside new residual

    # Middle flow at 1024x1024. Repeating only 3 times and not 8
    # for times in range(3):
    #     x = layers.Activation("relu")(x)
    #     x = layers.SeparableConv2D(1024, 3, padding="same")(x)
    #     x = layers.BatchNormalization()(x)
    #     x = layers.Activation("relu")(x)
    #     x = layers.SeparableConv2D(1024, 3, padding="same")(x)
    #     x = layers.BatchNormalization()(x)
    #     x = layers.MaxPooling2D(3, strides=2, padding="same")(x)


    # Exit flow (Simplified)
    x = layers.SeparableConv2D(1024, 3, padding="same")(x)
    x = layers.BatchNormalization()(x)
    x = layers.LeakyReLU(alpha=0.1)(x)

    x = layers.GlobalAveragePooling2D()(x)

    x = layers.Dropout(0.5)(x)
    outputs = layers.Dense(num_classes, activation="softmax")(x)
    return keras.Model(inputs, outputs, name="My_Mini_Xception_Model")

my_model = make_model(inputs=BASE_MODEL.output, num_classes=NUM_CLASSES)

logging.info('Creating and training model ...')
model = tf.keras.Sequential(
[
    keras.Input(shape=INPUT_SHAPE),
    DATA_AUGMENTATION,
    BASE_MODEL,
    my_model
])
model.compile(
    optimizer='adam',
    loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
    metrics=['accuracy']
)
callbacks = [
    tf.keras.callbacks.EarlyStopping(patience=3),
    tf.keras.callbacks.ModelCheckpoint(filepath='./models/breed_classifier_model.h5', save_best_only=True),
    # tf.keras.callbacks.TensorBoard(log_dir=log_dir, histogram_freq=1,profile_batch=(10, 15)),
]

def _preprocess(bytes_input):
    decoded = tf.io.decode_jpeg(bytes_input, channels=3)
    decoded = tf.image.convert_image_dtype(decoded, tf.float32)
    resized = tf.image.resize(decoded, size=(299, 299))
    return resized

@tf.function(input_signature=[tf.TensorSpec([None], tf.string)])
def preprocess_fn(bytes_inputs):
    decoded_images = tf.map_fn(
        _preprocess, bytes_inputs, dtype=tf.float32, back_prop=False
    )
    return {
        CONCRETE_INPUT: decoded_images
    }  # User needs to make sure the key matches model's input


@tf.function(input_signature=[tf.TensorSpec([None], tf.string)])
def serving_fn(bytes_inputs):
    images = preprocess_fn(bytes_inputs)
    prob = model_call(**images)
    return prob

model_call = tf.function(model.call).get_concrete_function(
    [tf.TensorSpec(shape=[None, IMG_WIDTH, IMG_WIDTH, 3], dtype=tf.float32, name=CONCRETE_INPUT)]
)

model.fit(dataset, epochs=20, callbacks=callbacks, validation_data=test_ds)
logging.info(f'Exporting SavedModel to: {output_directory}')
tf.saved_model.save(model, output_directory, signatures={"serving_default": serving_fn})