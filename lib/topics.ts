import * as github from "@actions/github";
import * as core from "@actions/core";

interface RepoQuery {
  user: {
    repositories: {
      nodes: Array<{
        repositoryTopics: {
          nodes: Array<{
            topic: {
              name: string
            }
          }>
        }
      }>
      pageInfo: {
        endCursor: number
        hasNextPage: boolean
      }
    }
  }
};

interface Topic {
  text: string
  count: number
};

export type {Topic};

async function getTopics() {
  const myToken = core.getInput('github-token');
  if (!myToken) {
    console.log('Required parameter "github-token" missing')
    throw new Error('MissingParmErr')
  }

  const login = core.getInput('test-login') || github.context.actor;
  const octokit = github.getOctokit(myToken);
  let topics : Array<string> = [];

  const query =
    `
      query getTopics($login: String!, $after: String){
        user(login: $login) {
          repositories(first: 100, after: $after) {
            nodes {
              repositoryTopics(first: 100) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    `;

  try {
    let request : RepoQuery = await octokit.graphql(
      query,
      {
        "login": login
      }
    );

    let newTopics = request.user.repositories.nodes
      .flatMap(n => n.repositoryTopics.nodes.map(t => t.topic.name));
    topics = [...topics, ...newTopics];
    while (request.user.repositories.pageInfo.hasNextPage) {
      request = await octokit.graphql(
        query,
        {
          "login": login,
          "after": request.user.repositories.pageInfo.endCursor
        }
      );
      newTopics = request.user.repositories.nodes
        .flatMap(n => n.repositoryTopics.nodes.map(t => t.topic.name));
      topics = [...topics, ...newTopics];
    }
    
    let topicFreq: {[Key: string]: number} = {};
    topics.forEach(topic => {
      if (topic in topicFreq) {
        topicFreq[topic]++;
      } else {
        topicFreq[topic] = 1;
      }
    })

    let cloudArr: Array<Topic> = [];
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

export default getTopics;
