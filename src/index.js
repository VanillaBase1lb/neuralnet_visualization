import * as d3 from "d3";
import { handleZoom, initZoom, showWeight, hideWeight } from "./utils";

let zoom = d3.zoom().on("zoom", handleZoom);

const layer_count = 5;
const precision = 3;
let node_count = new Array(layer_count).fill(0);
node_count[0] = 3;
node_count[1] = 2;
node_count[2] = 2;
node_count[3] = 6;
node_count[4] = 1;

// weight matrix
let weight_matrix = new Array(layer_count - 1);
for (let i = 0; i < layer_count - 1; i++) {
  weight_matrix[i] = new Array(node_count[i + 1]);
  for (let j = 0; j < node_count[i + 1]; j++) {
    weight_matrix[i][j] = new Array(node_count[i]);
    for (let k = 0; k < node_count[i]; k++) {
      weight_matrix[i][j][k] = Math.random();
    }
  }
}

const boxHeight = 600;
const width = 600;
const svg = d3.create("svg").attr("viewBox", [0, 0, width, boxHeight]);
const g = svg.append("g");
let nodes = [];

// add neurons
for (let i = 0; i < layer_count; i++) {
  nodes[i] = [];
  let nodecount = node_count[i]; // for bias neuron
  for (let j = 0; j < nodecount; j++) {
    nodes[i].push({
      x: (width / layer_count) * (i + 0.5),
      y: (boxHeight / (nodecount + 1)) * (j + 1),
      val: Math.random(),
    });
  }
}

// draw lines
for (let i = 0; i < layer_count - 1; i++) {
  for (let j = 0; j < node_count[i]; j++) {
    for (let k = 0; k < node_count[i + 1]; k++) {
      let color = "black";
      g.append("line")
        .attr("x1", nodes[i][j].x)
        .attr("y1", nodes[i][j].y)
        .attr("x2", nodes[i + 1][k].x)
        .attr("y2", nodes[i + 1][k].y)
        .style("stroke", color)
        .style("stroke-width", 1)
        .clone()
        .style("stroke", "transparent")
        .style("stroke-width", 10)
        .on("mouseover", function () {
          showWeight(this);
        })
        .on("mouseout", function () {
          hideWeight(this);
        });
      g.append("text")
        .attr("class", "weightText")
        .attr("text-anchor", "middle")
        .attr("display", "none")
        .attr("x", (nodes[i][j].x + nodes[i + 1][k].x) / 2)
        .attr("y", (nodes[i][j].y + nodes[i + 1][k].y) / 2)
        .text(weight_matrix[i][k][j].toFixed(precision));
    }
  }
}

// draw neurons
for (let i = 0; i < layer_count; i++) {
  for (let j = 0; j < node_count[i]; j++) {
    let color = "red";
    g.append("circle")
      .attr("cx", nodes[i][j].x)
      .attr("cy", nodes[i][j].y)
      .attr("r", 10)
      .style("fill", color)
      .style("stroke", "black")
      .text(nodes[i][j].val);
    g.append("text")
      .attr("class", "nodeText")
      .attr("text-anchor", "middle")
      .attr("x", nodes[i][j].x)
      .attr("y", nodes[i][j].y)
      .attr("dy", "0.35em")
      .attr("font-size", "0.5em")
      .text(nodes[i][j].val.toFixed(precision));
  }
}

d3.select("body").append(() => svg.node());
initZoom(zoom);
