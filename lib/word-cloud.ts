import buildCloud from "./build-cloud.js";
import drawCloud from "./draw-cloud.js";
import {parseHTML} from 'linkedom';
import {Topic} from "./topics.js";

interface Word {
  text: string
  size: number
}

export type {Word};

const {document} = parseHTML(`<!DOCTYPE html><body></body>`);

async function genSVG(words: Array<Topic>) {
  const sizes = words.map(w => w.count);
  const max = Math.max(...sizes);
  const min = Math.min(...sizes);
  const minFont = 24;
  const fontIncr = (max-min) == 0 ? 0 : 48/(max-min);
  
  const wordsSized = words.map((w: Topic) => { return {
    text: w.text,
    size: minFont + ((w.count - min) * fontIncr)
  }})

  const cloud = buildCloud(wordsSized, 800, 400);

  drawCloud(cloud.placed, cloud.layout, document);

  let retBuffer = '<?xml version="1.0" standalone="no"?>' + 
    '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">';
  retBuffer += document.body.innerHTML;

  return(retBuffer);
}

export default genSVG;
