const github = require('@actions/github');
const core = require('@actions/core');

async function getTopics() {
  const myToken = core.getInput('myToken');
  const login = core.getInput('login');
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
  console.log(request);
}

getTopics();