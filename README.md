# github-api
Github api wrapper action

Providers a github action wrapper around https://www.npmjs.com/package/github-api

### Example usage
```yaml
steps:
  - name: delete branch
    id: delete_branch
    uses: allenevans/github-apiv1.0.0
    with:
      token: ${{secrets.GH_TOKEN}}
      command: Repository.deleteRef
      repo: username/my-repo
      args: heads/my-feature-branch
```

Complex object arguments have to be expressed as a string using pipe `|`, since the key values in the `with` block
as currently the github workflow yml does not support nested objects.

`args` strings can be expressed as either `JSON` or `YAML`.

For example:-

```yaml
steps:
  - name: create pull request
    id: create_pull_request
    with:
      token: ${{secrets.GH_TOKEN}}
      command: Repository.createPullRequest
      repo: owner/repo
      args: |
        title: The next big feature
        body: Adds new feature
        head: feature-branch
        base: master
```

Examples can be found in the test files.

The response from the API call is mapped to the output of the action.
This can be customised using the `select` parameter which supports `jq` expressions.

For example:-

```yaml
steps:
  - name: create gist
    id: create_gist
    with:
      token: ${{secrets.GH_TOKEN}}
      command: Gist.create
      args: |
        - description: Hello World Examples
          public: false
          files:
            hello_world.js:
              content: config.log('hello world')
      select: ".data.id"
```

Will assign the id of the newly created gist  `steps.create_gist.outputs`

For a more detailed list of arguments required for each command, consult
http://github-tools.github.io/github/
