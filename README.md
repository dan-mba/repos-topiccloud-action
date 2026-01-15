
# Repos Topic Cloud Action

GitHub Action to create an svg of the 30 most used topics from all your repos


## SVG Topic Cloud

![SVG Topic Cloud](https://raw.githubusercontent.com/dan-mba/repos-topiccloud-action/main/cloud.svg)


## Usage

```yml
name: Create cloud
on:
  workflow_dispatch:

jobs:
  cloud-action:
    runs-on: ubuntu-latest
    steps:
    - name: Generate Word Cloud
      uses: dan-mba/repos-topiccloud-action@main
      with:
        github-token: ${{secrets.GITHUB_TOKEN}}
```

This action will generate the svg in the file `cloud.svg`.

Combine this action with checkout / checkin actions to add the file
to a repo or logic to upload it to a location of your choice.
