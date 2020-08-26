const github = require('@actions/github');
const core = require('@actions/core');

async function getTopics() {
  const myToken = core.getInput('github-token');
  const login = github.context.actor;
  const octokit = github.getOctokit(myToken);

  const request = await octokit.graphql(
    `
      query getTopics($login: String!){
        user(login: $login) {
          repositories(first: 100) {
            totalCount
            nodes {
              repositoryTopics(first: 100) {
                totalCount
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      "login": login
    }
  );
  const topics = request.user.repositories.nodes
    .flatMap(n => n.repositoryTopics.nodes.map(t => t.topic.name));
  
  let topicFreq = {};
  topics.forEach(topic => {
    if (topic in topicFreq) {
      topicFreq[topic]++;
    } else {
      topicFreq[topic] = 1;
    }
  })

  console.log(topicFreq);
}

getTopics();