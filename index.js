const fs = require("fs");
const getTopics = require("./lib/topics");
const genSVG = require("./lib/word-cloud");

(async function(){
  const topicArr = await getTopics();
  if (!topicArr || topicArr.length == 0) {
    console.log("Unable to get list of Topics from Github GraphQL API");
    throw new Error('GetTopicsErr');
  }

  const buffer = await genSVG(topicArr);
  try {
    fs.writeFileSync("cloud.svg", buffer);
  } catch(e) {
    console.log('Error wrting "cloud.svg"');
    throw e;
  }
})();
