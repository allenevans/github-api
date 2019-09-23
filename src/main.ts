import * as core from '@actions/core';
import GitHub from 'github-api';

(async function run() {
  try {
    Object.keys(process.env)
      .filter((key) => /^INPUT_/.test(key))
      .forEach((key) => {
        core.debug(`${key}=${process.env[key]}`);
        console.log(`${key}=${process.env[key]}`);
      });

    const gh = new GitHub({
      token: process.env.GITHUB_TOKEN || process.env.GH_TOKEN,
    });

    const response = await gh.getRepo('allenevans', 'github-api');

    console.log('response', response);
  } catch (error) {
    core.setFailed(error.message);
    process.exit(1);
  }
})();
