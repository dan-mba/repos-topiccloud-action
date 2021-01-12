const fs = require('fs');
//const getTopics = require('./lib/topics');
const genSVG = require('../lib/word-cloud');

(async function(){
  //const topicArr = await getTopics();

  let topicArr = [
    { text: 'react', count: 5 },
    { text: 'redux', count: 1 },
    { text: 'redux-thunk', count: 1 },
    { text: 'material-ui', count: 3 },
    { text: 'vue', count: 2 },
    { text: 'axios', count: 1 },
    { text: 'font-awesome', count: 1 },
    { text: 'vuetify', count: 1 },
    { text: 'nodejs', count: 1 },
    { text: 'express', count: 2 },
    { text: 'cors', count: 1 },
    { text: 'mongodb', count: 1 },
    { text: 'mongoose', count: 1 },
    { text: 'jquery', count: 2 },
    { text: 'd3', count: 1 },
    { text: 'netlify-cms', count: 1 },
    { text: 'gatsby', count: 1 },
    { text: 'nextjs', count: 1 },
    { text: 'sequelize', count: 1 },
    { text: 'reactstrap', count: 1 },
    { text: 'postgresql', count: 1 },
    { text: 'python', count: 4 },
    { text: 'flask', count: 2 },
    { text: 'matplotlib', count: 1 },
    { text: 'numpy', count: 1 },
    { text: 'react-native', count: 1 },
    { text: 'expo', count: 1 },
    { text: 'docker', count: 1 },
    { text: 'dotnet-core', count: 1 },
    { text: 'razor-pages', count: 1 },
    { text: 'mvc', count: 1 },
    { text: 'libman', count: 1 },
    { text: 'bootstrap', count: 1 },
    { text: 'readme', count: 1 },
    { text: 'opencv-python', count: 1 },
    { text: 'aws-lambda', count: 2 },
    { text: 'aws-sam', count: 2 },
    { text: 'dynamodb', count: 1 },
    { text: 'boto3', count: 1 }
  ];
  topicArr.sort((a,b) => {
    return a.count == b.count ? a.text.localeCompare(b.text) : b.count-a.count;
  })

  if(topicArr.length > 30) topicArr = topicArr.slice(0,30);

  const buffer = await genSVG(topicArr);
  fs.writeFileSync("cloud.svg", buffer);
})();
