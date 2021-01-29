import dotenv from 'dotenv';
import getTopics from '../lib/topics';

dotenv.config();

(async function (){
  let topicArr = await getTopics(process.env.USERID!, process.env.GITHUB_TOKEN!);
  if (topicArr.length > 30) topicArr = topicArr.slice(0,30);
  console.log(topicArr);
})()