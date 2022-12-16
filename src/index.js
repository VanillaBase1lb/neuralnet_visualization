import * as d3 from "d3";
import { handleZoom, updateNodes, updateWeights } from "./utils";
import { getNodes, getWeights } from "./data";
import { drawNodes, drawWeights } from "./draw";

let zoom = d3.zoom().on("zoom", handleZoom);

let nodes = [];
let nodes_all;
await getNodes().then((data) => {
  nodes_all = data;
});
const epoch_count = nodes_all.length;
const batch_count = nodes_all[0][0].length;
const layer_count = nodes_all[0].length;
const precision = 3;
const active_color = "red";
const inactive_color = "gray";
let node_count = new Array(layer_count);
for (let i = 0; i < layer_count; i++) {
  node_count[i] = nodes_all[0][i][0].length;
}

let weights_all;
await getWeights().then((data) => {
  weights_all = data;
});
// weight matrix
let weight_matrix = new Array(layer_count - 1);
updateWeights(layer_count, node_count, weight_matrix, weights_all, 0);

const boxHeight = 1000;
const boxWidth = 1000;
const svg = d3.create("svg").attr("viewBox", [0, 0, boxWidth, boxHeight]);
const g = svg.append("g");

// add neurons
updateNodes(
  layer_count,
  node_count,
  nodes,
  boxWidth,
  boxHeight,
  nodes_all,
  0,
  0
);

// draw lines
drawWeights(
  layer_count,
  node_count,
  weight_matrix,
  nodes,
  g,
  precision,
  active_color,
  inactive_color
);

// draw neurons
drawNodes(layer_count, node_count, nodes, g, precision, active_color);

d3.select("body").append(() => svg.node());
d3.select("svg").call(zoom);

document.getElementById("batch_number").attributes.max.value = batch_count - 1;
document.getElementById("epoch_number").attributes.max.value = epoch_count - 1;
document.getElementById("change").addEventListener("click", () => {
  let batch = document.getElementById("batch_number").value;
  let epoch = document.getElementById("epoch_number").value;
  if (batch < 0 || batch >= batch_count || epoch < 0 || epoch >= epoch_count) {
    alert("Invalid batch or epoch number");
    return;
  }
  updateWeights(layer_count, node_count, weight_matrix, weights_all, epoch);
  updateNodes(
    layer_count,
    node_count,
    nodes,
    boxWidth,
    boxHeight,
    nodes_all,
    batch,
    epoch
  );
  g.selectAll().remove();
  drawWeights(
    layer_count,
    node_count,
    weight_matrix,
    nodes,
    g,
    precision,
    active_color,
    inactive_color
  );
  drawNodes(layer_count, node_count, nodes, g, precision, active_color);
});
