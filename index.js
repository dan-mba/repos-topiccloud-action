const { getTopics } = require('./lib/topics');
const { genSVG } = require('./lib/word-cloud');

const topicArr = getTopics();
console.log(topicsArr);
genSVG(topicArr);
