import fs from 'fs';
import dotenv from 'dotenv';
import genSVG from '../lib/word-cloud';
import getTopics from '../lib/topics';

dotenv.config();

(async function(){
  let topicArr = await getTopics(process.env.USERID!, process.env.GITHUB_TOKEN!)
  if(topicArr.length > 30) topicArr = topicArr.slice(0,30);

  const buffer = await genSVG(topicArr);
  fs.writeFileSync("cloud-test.svg", buffer);
})();
