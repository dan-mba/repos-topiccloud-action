var { createCanvas, registerFont } = require("canvas");
var path = require('path');

var cloud = require("d3-cloud");

async function genSVG(words) {
  const max = Math.max(words.map(w => w.size));
  const minFont = 8;
  const fontIncr = 24/max;

  registerFont(path.join(__dirname,'oswald-latin-400.woff'),{family:'Oswald'})
  const canvas = createCanvas(1,1);

  const waitPromise = new Promise((resolve) => {
    cloud().size([640, 640])
        .canvas(function() { return canvas; })
        .words(words)
        .padding(5)
        .font("Oswald")
        .fontSize(function(d) { return minFont+(d.count*fontIncr); })
        .on("end", end)
        .start();

    function end(words) {
      console.log(words);
      const buffer = canvas.toBuffer('image/svg+xml');
      console.log(buffer)
      resolve(buffer);
    } 
  });

  const retWords = await waitPromise;


  return(retWords);
}

module.exports = genSVG;
