import * as d3 from "d3";

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
let nodes = [];
// nodes.push([width / 2, boxHeight / 1.5]);
// nodes.push([width / 4, boxHeight / 3]);
// nodes.push([width / 1.5, boxHeight / 3]);
for (let i = 0; i < hidden_layer_count + 2; i++) {
  for (let j = 0; j < node_count[i]; j++) {
    nodes.push([
      (width / (hidden_layer_count + 2)) * (i + 0.5),
      (boxHeight / (node_count[i] + 1)) * (j + 1),
    ]);
  }
}

for (let i = 0; i < nodes.length; i++) {
  svg
    .append("circle")
    .attr("cx", nodes[i][0])
    .attr("cy", nodes[i][1])
    .attr("r", 10)
    .style("fill", "red");
}

// let links = [];
// // Link from the first node to the second
// links.push(
//   d3.linkVertical()({
//     source: nodes[1],
//     target: nodes[0],
//   })
// );
//
// // Link from the first node to the third
// links.push(
//   d3.linkVertical()({
//     source: nodes[1],
//     target: nodes[2],
//   })
// );
//
// // Append the links to the svg element
// for (let i = 0; i < links.length; i++) {
//   svg
//     .append("path")
//     .attr("d", links[i])
//     .attr("stroke", "black")
//     .attr("fill", "none");
// }

d3.select("body").append(() => svg.node());
