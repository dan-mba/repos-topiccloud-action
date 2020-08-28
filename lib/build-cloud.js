const cloud = require("d3-cloud");
const { createCanvas } = require("canvas");

function buildCloud(words, width, height, callback) {
  return cloud().size([width , height])
    .words(words)
    .canvas(function() { return createCanvas(1,1); })
    .padding(5)
    .font("Arial")
    .fontSize(function(d) { return d.size; })
    .on("end", callback)
}

module.exports = buildCloud;
