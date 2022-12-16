import * as d3 from "d3";
import { handleZoom, initZoom, updateNodes, updateNodeValues } from "./utils";
import { getNodes, getWeights } from "./data";
import { drawNodes, drawWeights } from "./draw";

let zoom = d3.zoom().on("zoom", handleZoom);

let batch_nodes = [];
let nodes_all;
await getNodes().then((data) => {
  nodes_all = data;
});
const layer_count = nodes_all.length;
const precision = 3;
const active_color = "red";
const inactive_color = "gray";
let node_count = new Array(layer_count);
for (let i = 0; i < layer_count; i++) {
  node_count[i] = nodes_all[i][0].length;
}

let allweights;
await getWeights().then((data) => {
  allweights = data;
});
// weight matrix
let weight_matrix = new Array(layer_count - 1);
for (let i = 0; i < layer_count - 1; i++) {
  weight_matrix[i] = new Array(node_count[i + 1]);
  for (let j = 0; j < node_count[i + 1]; j++) {
    weight_matrix[i][j] = new Array(node_count[i]);
    for (let k = 0; k < node_count[i]; k++) {
      // weight_matrix[i][j][k] = Math.random();
      weight_matrix[i][j][k] = allweights[i][0][k][j];
    }
  }
}

const boxHeight = 1000;
const boxWidth = 1000;
const svg = d3.create("svg").attr("viewBox", [0, 0, boxWidth, boxHeight]);
const g = svg.append("g");

// add neurons
updateNodes(
  layer_count,
  node_count,
  batch_nodes,
  boxWidth,
  boxHeight,
  nodes_all,
  0
);

// draw lines
drawWeights(
  layer_count,
  node_count,
  weight_matrix,
  batch_nodes,
  g,
  precision,
  active_color,
  inactive_color
);

// draw neurons
drawNodes(layer_count, node_count, batch_nodes, g, precision, active_color);

d3.select("body").append(() => svg.node());
initZoom(zoom);

document.getElementById("batch_number").attributes.max.value = nodes_all[0].length - 1;
document.getElementById("batch_change").addEventListener("click", () => {
  updateNodeValues(
    layer_count,
    node_count,
    batch_nodes,
    boxWidth,
    boxHeight,
    nodes_all,
    g,
    precision,
    active_color
  );
});
