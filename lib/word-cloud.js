const buildCloud = require("./build-cloud");
const drawCloud = require("./draw-cloud");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
var document = dom.window.document;

async function genSVG(words) {
  const sizes = words.map(w => w.count);
  const max = Math.max(...sizes);
  const min = Math.min(...sizes);
  const minFont = 24;
  const fontIncr = (max-min) == 0 ? 0 : 40/(max-min);

  const wordsSized = words.map(w => { return {
    text: w.text,
    size: minFont + ((w.count - min) * fontIncr)
  }})

  const waitPromise = new Promise((resolve) => {
    const layout = buildCloud(wordsSized, 640, 480, end)

    function end(words) {
      drawCloud(words, layout, document)
      resolve(document.body.innerHTML);
    }

    layout.start();
  });

  let retBuffer = '<?xml version="1.0" standalone="no"?>' + 
    '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">';
  retBuffer += await waitPromise;

  return(retBuffer);
}

module.exports = genSVG;
