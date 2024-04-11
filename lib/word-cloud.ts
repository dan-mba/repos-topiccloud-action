import buildCloud from "./build-cloud.js";
import drawCloud from "./draw-cloud.js";
import jsdom from "jsdom";
import {Topic} from "./topics";
import {Word} from "d3-cloud";

const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
const document = dom.window.document;

async function genSVG(words: Array<Topic>) {
  const sizes = words.map(w => w.count);
  const max = Math.max(...sizes);
  const min = Math.min(...sizes);
  const minFont = 24;
  const fontIncr = (max-min) == 0 ? 0 : 48/(max-min);
  
  const wordsSized: Array<Word> = words.map((w: Topic): Word => { return {
    text: w.text,
    size: minFont + ((w.count - min) * fontIncr)
  }})

  const waitPromise = new Promise((resolve) => {
    const layout = buildCloud(wordsSized, 800, 400, end)

    function end(words: Array<Word>) {
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

export default genSVG;
