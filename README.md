# neuralnet_visualization

Data visualization tool for neural networks

## Tech Stack

- [D3.js](https://d3js.org)

## Installation

1. Clone the repo and `cd` into the directory.

   ```sh
   git clone https://github.com/vanillabase1lb/neuralnet_visualization.git
   cd neuralnet_visualization/
   ```

2. Install required packages using `npm install`.

3. Run `./test_data_generator/ann_data_generator.py` to get sample data (`nodes.json` and `weights.json`) or generate own data.

4. Place `nodes.json` and `weights.json` in `./public/data/`.

5. Start webpack dev server using `npm run dev`.

## Custom ANN visualization

The application only reads data from `nodes.json` and `weights.json`. Any such ANN data structured in the below mentioned "standard" may be accepted.
The `./test_data_generator/` directory also contains a reference implementation using custom callbacks in Keras to get nodes and weights data after every epoch.

`nodes.json` format:

```json
[ --> only 1 should be present at the beginning and ending of JSON
[ --> 1 for every epoch
[ --> 1 for every layer of the ANN
[ --> 1 for every batch
   N comma separated values where N = no. of nodes in the layer
]
]
]
]
```

`weights.json` format:

```json
[ --> only 1 should be present at the beginning and ending of JSON
[ --> 1 for every epoch
[ --> 1 for every 2 adjacent layers of the ANN (should be equal to no. of layers - 1)
[ --> should be only 2. First one is weight matrix(n x m), second is bias array(m). Second one is currenly ignored, but should be present nevertheless
[ --> N number of arrays where N = no. of nodes in the first out of the 2 adjacent layers
    M comma separated values where M = no. of nodes in the second out of the 2 adjacent layers
]
]
]
]
]
```
