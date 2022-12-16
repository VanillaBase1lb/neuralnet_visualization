import * as d3 from "d3";

export function handleZoom(e) {
  d3.select("svg g").attr("transform", e.transform);
}

export function showWeight(line, e, weight, color, precision) {
  let tooltip = document.getElementById("tooltip_span");
  tooltip.style.top = e.y + "px";
  tooltip.style.left = e.x + "px";
  tooltip.style.display = "block";
  tooltip.innerHTML = weight.toFixed(precision);
  d3.select(line.previousSibling).style("stroke", color);
}

export function hideWeight(line, color) {
  let tooltip = document.getElementById("tooltip_span");
  tooltip.style.display = "none";
  d3.select(line.previousSibling).style("stroke", color);
}

export function updateNodes(
  layer_count,
  node_count,
  nodes,
  boxWidth,
  boxHeight,
  nodes_all,
  batch,
  epoch
) {
  for (let i = 0; i < layer_count; i++) {
    nodes[i] = [];
    let nodecount = node_count[i]; // for bias neuron
    for (let j = 0; j < nodecount; j++) {
      nodes[i].push({
        x: (boxWidth / layer_count) * (i + 0.5),
        y: (boxHeight / (nodecount + 1)) * (j + 1),
        val: nodes_all[epoch][i][batch][j],
      });
    }
  }
  return nodes;
}

export function updateWeights(
  layer_count,
  node_count,
  weight_matrix,
  weights_all,
  epoch
) {
  for (let i = 0; i < layer_count - 1; i++) {
    weight_matrix[i] = new Array(node_count[i + 1]);
    for (let j = 0; j < node_count[i + 1]; j++) {
      weight_matrix[i][j] = new Array(node_count[i]);
      for (let k = 0; k < node_count[i]; k++) {
        // weight_matrix[i][j][k] = Math.random();
        // 0 in 3 nested level because the second element array is bias values
        weight_matrix[i][j][k] = weights_all[epoch][i][0][k][j];
      }
    }
  }
  return weight_matrix;
}
