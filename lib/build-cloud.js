const cloud = require("d3-cloud");
const { createCanvas } = require("canvas");

function buildCloud(words, width, height, callback) {
  try {
    return cloud().size([width , height])
      .words(words)
      .canvas(function() { return createCanvas(1,1); })
      // Select an angle between -60 and +60 degrees at 15 degree intervals
      .rotate(function() { return (~~(Math.random() * 9) * 15) - 60; })
      .padding(5)
      .font("Arial")
      .fontSize(function(d) { return d.size; })
      .on("end", callback)
  } catch(e) {
    console.log("Building word cloud failed");
    throw e;
  }
}

module.exports = buildCloud;
