import * as core from '@actions/core';

(function run() {
  try {
    core.debug('todo');
  } catch (error) {
    core.setFailed(error.message);
    process.exit(1);
  }
})();
