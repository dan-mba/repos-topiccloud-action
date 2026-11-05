import CloudLayout, {PlacedSprite} from "d3-cloud";
import {createCanvas} from "@napi-rs/canvas";
import {Word} from "./word-cloud.js";

// Generator function that will flip between returning 1 and 0
function* iterator(): Generator<number> {
  let i=1;
  while (true) {
    yield (i++%2);
  }
}
/*
const createCanvas = (width: number, height: number): Canvas => {
  return new Canvas(width, height);
}
*/
function buildCloud(words: Array<Word>, width: number, height: number) {
  const flipRotation = iterator();

  const layout = new CloudLayout()
    .canvas(() => createCanvas(1, 1))
    .size([width , height])
    .overflow(false)
    .strategy("rectangular")
  
  const prepared = words.map((datum, index) => ({
    datum,
    index,
    text: datum.text,
    size: datum.size
  })).sort((a, b) => b.size - a.size);

  const placed: Array<PlacedSprite> = [];
  for (const word of prepared) {
    const rotate = (flipRotation.next().value * 90) - 90;
    const sprite = layout.getSprite(word.text, {
      datum: word,
      font: "Verdana",
      size: word.size,
      rotate: rotate,
      padding: 5
    });
    if (!sprite) continue;
  
    const result = layout.place(sprite);
    if (result) placed.push(result);
  }

  return {placed, layout};
}

export default  buildCloud;
