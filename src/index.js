import * as d3 from "d3";

let zoom = d3.zoom().on("zoom", handleZoom);

function handleZoom(e) {
  d3.select("svg g").attr("transform", e.transform);
}

function initZoom() {
  d3.select("svg").call(zoom);
}

const layer_count = 5;
let node_count = new Array(layer_count).fill(0);
node_count[0] = 3;
node_count[1] = 2;
node_count[2] = 2;
node_count[3] = 6;
node_count[4] = 1;
// console.log(node_count);

const boxHeight = 600;
const width = 600;
const svg = d3.create("svg").attr("viewBox", [0, 0, width, boxHeight]);
const g = svg.append("g");
let nodes = [];

// add neurons
for (let i = 0; i < layer_count; i++) {
  nodes[i] = [];
  let nodecount = node_count[i] + 1; // for bias neuron
  for (let j = 0; j < nodecount; j++) {
    nodes[i].push({
      x: (width / layer_count) * (i + 0.5),
      y: (boxHeight / (nodecount + 1)) * (j + 1),
    });
  }
}

// draw lines
for (let i = 0; i < layer_count - 1; i++) {
  for (let j = 0; j < node_count[i] + 1; j++) {
    for (let k = 1; k < node_count[i + 1] + 1; k++) {
      let color = "black";
      // bias connection
      if (j == 0) {
        color = "gray";
      }
      g.append("line")
        .attr("x1", nodes[i][j].x)
        .attr("y1", nodes[i][j].y)
        .attr("x2", nodes[i + 1][k].x)
        .attr("y2", nodes[i + 1][k].y)
        .style("stroke", color)
        .style("stroke-width", 1);
    }
  }
}

// draw neurons
for (let i = 0; i < layer_count; i++) {
  for (let j = 0; j < node_count[i] + 1; j++) {
    // output layer bias
    if (i == layer_count - 1 && j == 0) {
      continue;
    }
    let color = "red";
    // bias neuron
    if (j == 0) {
      color = "yellow";
    }
    g.append("circle")
      .attr("cx", nodes[i][j].x)
      .attr("cy", nodes[i][j].y)
      .attr("r", 10)
      .style("fill", color);
  }
}

d3.select("body").append(() => svg.node());
initZoom();
