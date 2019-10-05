import * as core from '@actions/core';
import GitHub from 'github-api';
import { inputParse } from './utils/input-parse';

const mapping: Record<string, Function> = {
  Gist: (github: any) => require('./gist/gist').default(github),
  Issue: (github: any) => require('./issue/issue').default(github),
  Markdown: (github: any) => require('./markdown/markdown').default(github),
  Organization: (github: any) => require('./organization/organization').default(github),
  Repository: (github: any) => require('./repository/repository').default(github),
};

const formatError = ({ data }: any) => `${data.message}\n${JSON.stringify(data.errors || {}, null, 2)}`;

(async function run() {
  const input = inputParse(core.getInput);

  try {
    Object.keys(process.env)
      .filter((key) => /^INPUT_/.test(key))
      .forEach((key) => {
        core.debug(`${key}=${process.env[key]}`);
        console.log(`${key}=${process.env[key]}`);
      });

    const { apiClass } = input.command;

    const github = new GitHub({
      token: input.token || process.env.GITHUB_TOKEN || process.env.GH_TOKEN,
      apiBase: input.apiBase,
    });

    const result = await mapping[apiClass](github)(input);

    if (!result.error) {
      core.setOutput('result', JSON.stringify(result, null, 2));
      return;
    }

    const error = formatError(result);

    if (!input.ignoreErrors) {
      throw new Error(error);
    }

    core.info(error);
  } catch (x) {
    console.error(x);
    core.setFailed(x.message);

    process.exit(1);
  }
})();
