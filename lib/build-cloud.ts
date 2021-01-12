import cloud, {Word} from "d3-cloud";
import { createCanvas } from "canvas";

function buildCloud(words: Array<Word>, width: number, height: number, callback: (words: Array<Word>) => void) {
  try {
    return cloud().size([width , height])
      .words(words)
      // ignore canvas type mismatch
      // @ts-ignore
      .canvas(function() { return createCanvas(1,1); })
      // Select an angle between -60 and +60 degrees at 15 degree intervals
      .rotate(function() { return (~~(Math.random() * 9) * 15) - 60; })
      .padding(5)
      .font("Arial")
      .fontSize(function(d): number { return d.size!; })
      .on("end", callback)
  } catch(e) {
    console.log("Building word cloud failed");
    throw e;
  }
}

export = buildCloud;
