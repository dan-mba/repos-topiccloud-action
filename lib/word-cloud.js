var Canvas = require("canvas");

var cloud = require("d3-cloud");

async function genSVG(words) {
  const max = Math.max(words.map(w => w.size));
  const minFont = 8;
  const fontIncr = 24/max;

  const waitPromise = new Promise((resolve,reject) => {
    cloud().size([640, 640])
        .canvas(function() { return new Canvas(1, 1); })
        .words(words)
        .padding(5)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .fontSize(function(d) { return minFont+(d.count*fontIncr); })
        .on("end", end)
        .start();

    function end(words) {
      console.log(JSON.stringify(words));
      resolve(words);
    } 
  });

  const retWords = await waitPromise;
  return(retWords);
}

module.exports.genSVG = genSVG;
