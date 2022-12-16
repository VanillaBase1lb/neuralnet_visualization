import * as d3 from "d3";
import { drawNodes } from "./draw";

export function handleZoom(e) {
  d3.select("svg g").attr("transform", e.transform);
}

export function initZoom(zoom) {
  d3.select("svg").call(zoom);
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
  allnodes,
  batch
) {
  for (let i = 0; i < layer_count; i++) {
    nodes[i] = [];
    let nodecount = node_count[i]; // for bias neuron
    for (let j = 0; j < nodecount; j++) {
      nodes[i].push({
        x: (boxWidth / layer_count) * (i + 0.5),
        y: (boxHeight / (nodecount + 1)) * (j + 1),
        val: allnodes[i][batch][j],
      });
    }
  }
  return nodes;
}

export function updateNodeValues(
  layer_count,
  node_count,
  batch_nodes,
  boxWidth,
  boxHeight,
  nodes_all,
  g,
  precision,
  active_color
) {
  let batch = document.getElementById("batch_number").value;
  updateNodes(
    layer_count,
    node_count,
    batch_nodes,
    boxWidth,
    boxHeight,
    nodes_all,
    batch
  );
  g.selectAll("circle").remove();
  g.selectAll("text").remove();
  drawNodes(layer_count, node_count, batch_nodes, g, precision, active_color);
}
