import * as core from '@actions/core';
import GitHub from 'github-api';
import { inputParse } from './utils/input-parse';

const mapping: Record<string, Function> = {
  Gist: (github: any) => require('./gist/gist').default(github),
  Issue: (github: any) => require('./issue/issue').default(github),
  Repository: (github: any) => require('./repository/repository').default(github),
};

(async function run() {
  try {
    Object.keys(process.env)
      .filter((key) => /^INPUT_/.test(key))
      .forEach((key) => {
        core.debug(`${key}=${process.env[key]}`);
        console.log(`${key}=${process.env[key]}`);
      });

    const input = inputParse(core.getInput);
    const { apiClass } = input.command;

    const token = core.getInput('token') || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

    const github = new GitHub({
      token,
      apiBase: input.apiBase,
    });

    const result = await mapping[apiClass](github)(input);

    core.setOutput('result', result);
  } catch (x) {
    console.error(x);
    core.setFailed(x.message);
    process.exit(1);
  }
})();
