const d3 = require("d3");
const randomColor = require("randomcolor");

function drawCloud(words, layout, document) {
  try {
    const body = d3.select(document.body);
    body.append("svg")
          .attr("width", layout.size()[0])
          .attr("height", layout.size()[1])
          .attr("xmlns", "http://www.w3.org/2000/svg")
        .append("g")
          .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
          .data(words)
        .enter().append("text")
          .style("font-size", d => d.size + "px")
          .style("font-family", "Arial")
          .style("fill", () => randomColor({hue: "blue", luminosity: "bright"}))
          .attr("text-anchor", "middle")
          .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
          .text(d => d.text);
  } catch(e) {
    console.log('Drawing word cloud failed');
    throw e;
  }
}

module.exports = drawCloud;
