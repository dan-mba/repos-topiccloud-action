import fs from 'fs';
import genSVG from '../lib/word-cloud';

(async function(){

  let topicArr = [
    { text: 'javascript', count: 14 },
    { text: 'react', count: 9 },
    { text: 'python', count: 5 },
    { text: 'material-ui', count: 4 },
    { text: 'nodejs', count: 4 },
    { text: 'aws-lambda', count: 3 },
    { text: 'aws-sam', count: 3 },
    { text: 'axios', count: 3 },
    { text: 'bootstrap', count: 3 },
    { text: 'graphql', count: 3 },
    { text: 'typescript', count: 3 },
    { text: 'css', count: 2 },
    { text: 'd3', count: 2 },
    { text: 'express', count: 2 },
    { text: 'flask', count: 2 },
    { text: 'font-awesome', count: 2 },
    { text: 'gatsby', count: 2 },
    { text: 'html', count: 2 },
    { text: 'jquery', count: 2 },
    { text: 'matplotlib', count: 2 },
    { text: 'numpy', count: 2 },
    { text: 'opencv-python', count: 2 },
    { text: 'vue', count: 2 },
    { text: 'aws-rekognition', count: 1 },
    { text: 'boto3', count: 1 },
    { text: 'cognito', count: 1 },
    { text: 'cors', count: 1 },
    { text: 'csharp', count: 1 },
    { text: 'docker', count: 1 },
    { text: 'dotnet-core', count: 1 }
  ];
  topicArr.sort((a,b) => {
    return a.count == b.count ? a.text.localeCompare(b.text) : b.count-a.count;
  })

  if(topicArr.length > 30) topicArr = topicArr.slice(0,30);

  const buffer = await genSVG(topicArr);
  fs.writeFileSync("cloud.svg", buffer);
})();
