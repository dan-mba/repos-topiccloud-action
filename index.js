const getTopics = require('./lib/topics');
const genSVG = require('./lib/word-cloud');

(async function(){
  const topicArr = await getTopics();
  const buffer = await genSVG(topicArr);
  console.log(buffer)
})();
