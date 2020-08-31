const github = require('@actions/github');
const core = require('@actions/core');

async function getTopics() {
  const myToken = core.getInput('github-token');
  if (!myToken) {
    console.log('Required parameter "github-token" missing')
    throw new Error('MissingParmErr')
  }

  const login = github.context.actor;
  const octokit = github.getOctokit(myToken);

  try {
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

    let cloudArr = [];
    for (const t in topicFreq) {
      cloudArr.push({
        text: t,
        count: topicFreq[t]
      })
    }

    cloudArr.sort((a,b) => {
      return a.count == b.count ? a.text.localeCompare(b.text) : b.count - a.count;
    })

    return cloudArr;

  } catch(e) {
    console.log('Call to GitHub GraphQL API failed');
    throw e;
  }
}

module.exports = getTopics;