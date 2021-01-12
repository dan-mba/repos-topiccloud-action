import fs from "fs";
import getTopics from "./lib/topics";
import genSVG from "./lib/word-cloud";

(async function(){
  let topicArr = await getTopics();
  if (!topicArr || topicArr.length == 0) {
    console.log("Unable to get list of Topics from Github GraphQL API");
    throw new Error('GetTopicsErr');
  }

  if (topicArr.length > 30) topicArr = topicArr.slice(0,30);

  const buffer = await genSVG(topicArr);
  try {
    fs.writeFileSync("cloud.svg", buffer);
  } catch(e) {
    console.log('Error wrting "cloud.svg"');
    throw e;
  }
})();
