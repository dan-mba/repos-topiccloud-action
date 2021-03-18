import cloud, {Word} from "d3-cloud";
import { createCanvas } from "canvas";

// Generator function that will flip between returning 1 and 0
function* iterator(): Generator<number> {
  let i=1;
  while (true) {
    yield (i++%2);
  }
}

function buildCloud(words: Array<Word>, width: number, height: number, callback: (words: Array<Word>) => void) {
  try {
    let flipRotation = iterator();

    return cloud().size([width , height])
      .words(words)
      // ignore canvas type mismatch
      // @ts-ignore
      .canvas(function() { return createCanvas(1,1); })
      // Use an angle of 0 or -90 degrees
      .rotate(function() { return (flipRotation.next().value * 90) - 90; })
      .padding(5)
      .font("Verdana")
      .fontSize(function(d): number { return d.size!; })
      .on("end", callback)
  } catch(e) {
    console.log("Building word cloud failed");
    throw e;
  }
}

export = buildCloud;
