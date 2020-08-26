const getTopics = require('./lib/topics');
const genSVG = require('./lib/word-cloud');

(async function(){
  const topicArr = await getTopics();
  await genSVG(topicArr);
})();
