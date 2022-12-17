from tensorflow import keras
import pandas as pd
from sklearn.model_selection import train_test_split
import numpy as np
import matplotlib.pyplot as plt
import json
from json import JSONEncoder
from keras.callbacks import LambdaCallback
from keras import backend as K

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
    keras.layers.Dense(5, activation='relu'),
    keras.layers.Dense(5, activation='relu'),
    keras.layers.Dense(2, activation='softmax')
])

weights_arr = []

def custom_callback(model):
    temp = []
    for i in range(len(model.layers)):
        temp.append(model.layers[i].get_weights())
    weights_arr.append(temp)

print_weights = LambdaCallback(on_epoch_end=lambda batch, logs: custom_callback(model))

activations_list = [] #[epoch][layer][0][X][unit]
x_data = pd.DataFrame(x).values.tolist()

def save_activations(model):
    outputs = [layer.output for layer in model.layers]
    functors = [K.function(model.input,out) for out in outputs]
    layer_activations = [f(x) for f in functors]
    layer_activations.insert(0, x_data)
    activations_list.append(layer_activations)

activations_callback = LambdaCallback(on_epoch_end = lambda batch, logs:save_activations(model))

model.compile(optimizer='adam',
              loss=keras.losses.SparseCategoricalCrossentropy(),
              metrics=['accuracy'])

history = model.fit(x, y, epochs=10, callbacks=[activations_callback, print_weights])

extractor = keras.Model(inputs=model.inputs,
                        outputs=[layer.output for layer in model.layers])
features = extractor(x, y)

weigh = open("weights.json", "w")
obj = json.dumps(weights_arr, cls=NumpyArrayEncoder, indent=2)
weigh.write(obj)

nodes = open("nodes.json", "w")
obj2 = json.dumps(activations_list, cls=NumpyArrayEncoder, indent=2)
nodes.write(obj2)

# plt.plot(history.history['accuracy'])
#plt.plot(history.history['val_accuracy'])
# plt.title('model accuracy')
# plt.ylabel('accuracy')
# plt.xlabel('epoch')
# plt.legend(['train', 'test'], loc='upper left')
#plt.show()

# plt.plot(history.history['loss'])
#plt.plot(history.history['val_loss'])
# plt.title('model loss')
# plt.ylabel('loss')
# plt.xlabel('epoch')
# plt.legend(['train', 'test'], loc='upper left')
#plt.ylim(0, 30)
#plt.show()

# x = test.loc[:, test.columns!='color'].values
# y = test['color'].values

# print(model.evaluate(x, y))

# keras.utils.plot_model(model, to_file="model.png", show_shapes=True)
