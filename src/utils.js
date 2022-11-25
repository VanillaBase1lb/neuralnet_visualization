import * as d3 from "d3";

export function handleZoom(e) {
  d3.select("svg g").attr("transform", e.transform);
}

export function initZoom(zoom) {
  d3.select("svg").call(zoom);
}

export function showWeight(line) {
  d3.select(line.previousSibling).style("stroke", "red");
  let text = d3.select(line.nextSibling);
  text.attr("display", "true");
}

export function hideWeight(line) {
  d3.select(line.previousSibling).style("stroke", "black");
  let text = d3.select(line.nextSibling);
  text.attr("display", "none");
}
