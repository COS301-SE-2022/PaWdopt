# Imports
import tensorflow as tf
from tensorflow import keras
from keras import layers
import datetime
from numpy import genfromtxt
import csv

class breed_detector:

    # Model Configuration
    image_size = (299,299)
    batch_size = 32
    train_ds = None
    test_ds = None

    labels = genfromtxt('labels.csv', delimiter=',', dtype='str')
    num_classes = len(labels)
    

    def get_data_sets(self):
    # Get Data Sets from Images folder
        self.get_data_sets()

        self.train_ds = keras.preprocessing.image_dataset_from_directory(
            "Images",
            validation_split=0.2,
            subset="training",
            seed=1994,
            image_size=self.image_size,
            batch_size=self.batch_size,
        )
        self.test_ds = keras.preprocessing.image_dataset_from_directory(
            "Images",
            validation_split=0.2,
            subset="validation",
            seed=1994,
            image_size=self.image_size,
            batch_size=self.batch_size,
        )
        self.labels = self.test_ds.class_names
        self.num_classes = len(self.labels)
        with open('labels.csv', 'w') as f:
            write = csv.writer(f)
            write.writerow(self.labels)
    input_shape = image_size + (3,)

    # Augmentation Layers
    data_augmentation = keras.models.Sequential(
        [
            keras.Input(shape=input_shape),
            layers.RandomFlip("horizontal"),
            layers.RandomRotation(0.1),
            layers.Rescaling(1.0/255),
        ],
        name="Data_Augmentation"
    )

    def train_model(self):
        # Define Base Model
        base_model = keras.applications.Xception(
            weights='imagenet',  # Load weights pre-trained on ImageNet.
        input_shape=self.input_shape,
        include_top=False)
        base_model.trainable = False # Fix pretrained layers


        # Mini Xception ML Model
        def make_model(inputs, num_classes):
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

        my_model = make_model(inputs=base_model.output, num_classes=self.num_classes)
        my_model.trainable=True

        # Make Final Model
        model = keras.models.Sequential([
            keras.Input(shape=self.input_shape),
            self.data_augmentation,
            base_model,
            my_model
            ])
        log_dir = "logs/fit/" + datetime.datetime.now().strftime("%Y%m%d-%H%M%S")

        callbacks = [
            tf.keras.callbacks.EarlyStopping(patience=2),
            tf.keras.callbacks.ModelCheckpoint(filepath='./models/breed_classifier_model.h5', save_best_only=True),
            tf.keras.callbacks.TensorBoard(log_dir=log_dir, histogram_freq=1,profile_batch=(10, 15)),
        ]
        model.compile(
            optimizer=keras.optimizers.Adam(1e-3),
            loss="sparse_categorical_crossentropy",
            metrics=["accuracy"],
        )
        # Prefetch Datasets in batches
        train_ds = self.train_ds.prefetch(buffer_size=32)
        test_ds = self.test_ds.prefetch(buffer_size=32)
        
        model.fit(
        train_ds, epochs=15, callbacks=callbacks, validation_data=test_ds,
        )

    saved_model = keras.models.load_model('./models/breed_classifier_model.h5')
    def evaluate_image(self, img_path):
        # Load from local

        # Prediction test

        # Load image
        img = keras.preprocessing.image.load_img(
            img_path, target_size=self.image_size
        )
        # Convert input to array
        img_array = keras.preprocessing.image.img_to_array(img)
        img_array = tf.expand_dims(img_array, 0)  # Create batch axis

        # Predict Result
        predictions = self.saved_model.predict(img_array)
        result = predictions.argmax()
        restype = self.labels[result]
        return restype

