import fs from "fs";
import * as core from '@actions/core';
import getTopics from "./lib/topics.js";
import genSVG from "./lib/word-cloud.js";

(async function(){
  const myToken = core.getInput('github-token');
  if (!myToken) {
    console.log('Required parameter "github-token" missing');
    throw new Error('MissingParmErr');
  }

  const login = process.env.GITHUB_ACTOR;
  if (!login) {
    console.log('Unable to access action actor');
    throw new Error('MissingActorErr');
  }

  let topicArr = await getTopics(login, myToken);
  if (!topicArr || topicArr.length == 0) {
    console.log("Unable to get list of Topics from Github GraphQL API");
    throw new Error('GetTopicsErr');
  }

  if (topicArr.length > 30) topicArr = topicArr.slice(0,30);

  const buffer = await genSVG(topicArr);
  try {
    fs.writeFileSync("cloud.svg", buffer);
  } catch(e) {
    console.log('Error writing "cloud.svg"');
    throw e;
  }
})();
