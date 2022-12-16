from tensorflow import keras
import pandas as pd
from sklearn.model_selection import train_test_split
import numpy as np
import matplotlib.pyplot as plt
import json
from json import JSONEncoder
from keras.callbacks import LambdaCallback

class NumpyArrayEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return JSONEncoder.default(self, obj)

np.set_printoptions(threshold=np.inf)

df = pd.read_csv('data.txt')

train, test = train_test_split(df, test_size=0.2, random_state=42, shuffle=True)

x = train.loc[:, train.columns!='color'].values
y = train['color'].values

model = keras.Sequential([
    keras.layers.Dense(4, input_shape=(2,), activation='relu'),
    keras.layers.Dense(10, activation='relu'),
    keras.layers.Dense(10, activation='relu'),
    keras.layers.Dense(2, activation='softmax')
])

model.compile(optimizer='adam',
              loss=keras.losses.SparseCategoricalCrossentropy(),
              metrics=['accuracy'])

history = model.fit(x, y, epochs=1)

extractor = keras.Model(inputs=model.inputs,
                        outputs=[layer.output for layer in model.layers])
features = extractor(x, y)

weigh = open("weights2.json", "w")
arr2=[]
for layer in model.layers:
    weights = layer.get_weights()
    arr2.append(weights)
obj = json.dumps(arr2, cls=NumpyArrayEncoder, indent=2)
weigh.write(obj)

data = open("nodes.json", "w")
arr=[]
x_data = pd.DataFrame(x).values.tolist()
arr.append(x_data)
for i in features:
    b = pd.DataFrame(i).values.tolist()
    arr.append(b)
obj = json.dumps(arr, cls=NumpyArrayEncoder, indent=2)
data.write(obj)

plt.plot(history.history['accuracy'])
#plt.plot(history.history['val_accuracy'])
plt.title('model accuracy')
plt.ylabel('accuracy')
plt.xlabel('epoch')
plt.legend(['train', 'test'], loc='upper left')
#plt.show()

plt.plot(history.history['loss'])
#plt.plot(history.history['val_loss'])
plt.title('model loss')
plt.ylabel('loss')
plt.xlabel('epoch')
plt.legend(['train', 'test'], loc='upper left')
#plt.ylim(0, 30)
#plt.show()

x = test.loc[:, test.columns!='color'].values
y = test['color'].values

print(model.evaluate(x, y))

keras.utils.plot_model(model, to_file="model.png", show_shapes=True)