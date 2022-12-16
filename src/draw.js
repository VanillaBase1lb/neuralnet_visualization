import { showWeight, hideWeight } from "./utils";

export function drawNodes(
  layer_count,
  node_count,
  nodes,
  g,
  precision,
  active_color
) {
  // draw neurons
  for (let i = 0; i < layer_count; i++) {
    for (let j = 0; j < node_count[i]; j++) {
      let color = active_color;
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
}

export function drawWeights(
  layer_count,
  node_count,
  weight_matrix,
  nodes,
  g,
  precision,
  active_color,
  inactive_color
) {
  for (let i = 0; i < layer_count - 1; i++) {
    for (let j = 0; j < node_count[i]; j++) {
      for (let k = 0; k < node_count[i + 1]; k++) {
        let color = inactive_color;
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
          .on("mouseover", function (e) {
            showWeight(
              this,
              e,
              weight_matrix[i][k][j],
              active_color,
              precision
            );
          })
          .on("mouseout", function (e) {
            hideWeight(this, inactive_color);
          });
      }
    }
  }
}
