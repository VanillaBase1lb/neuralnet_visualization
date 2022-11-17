import * as d3 from "d3";

let zoom = d3.zoom().on("zoom", handleZoom);

function handleZoom(e) {
  d3.select("svg g").attr("transform", e.transform);
}

function initZoom() {
  d3.select("svg").call(zoom);
}

const hidden_layer_count = 3;
let node_count = new Array(hidden_layer_count + 2).fill(0);
node_count[0] = 3;
node_count[1] = 2;
node_count[2] = 2;
node_count[3] = 9;
node_count[4] = 1;
// console.log(node_count);

const boxHeight = 600;
const width = 600;
const svg = d3.create("svg").attr("viewBox", [0, 0, width, boxHeight]);
const g = svg.append("g");
let nodes = [];
// nodes.push([width / 2, boxHeight / 1.5]);
// nodes.push([width / 4, boxHeight / 3]);
// nodes.push([width / 1.5, boxHeight / 3]);
for (let i = 0; i < hidden_layer_count + 2; i++) {
  nodes[i] = [];
  for (let j = 0; j < node_count[i]; j++) {
    nodes[i].push({
      x: (width / (hidden_layer_count + 2)) * (i + 0.5),
      y: (boxHeight / (node_count[i] + 1)) * (j + 1),
    });
  }
}

for (let i = 0; i < hidden_layer_count + 1; i++) {
  for (let j = 0; j < node_count[i]; j++) {
    for (let k = 0; k < node_count[i + 1]; k++) {
      g.append("line")
        .attr("x1", nodes[i][j].x)
        .attr("y1", nodes[i][j].y)
        .attr("x2", nodes[i + 1][k].x)
        .attr("y2", nodes[i + 1][k].y)
        .style("stroke", "black")
        .style("stroke-width", 1);
    }
  }
}

for (let i = 0; i < hidden_layer_count + 2; i++) {
  for (let j = 0; j < node_count[i]; j++) {
    g.append("circle")
      .attr("cx", nodes[i][j].x)
      .attr("cy", nodes[i][j].y)
      .attr("r", 10)
      .style("fill", "red");
  }
}

d3.select("body").append(() => svg.node());
initZoom();
