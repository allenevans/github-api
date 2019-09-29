import * as core from '@actions/core';
import jsYaml from 'js-yaml';
import { ActionInput } from '../types/action-input';
import { commandParse } from './command-parse';

export const inputParse: () => ActionInput = () => {
  const yaml = core.getInput('yaml');

  if (yaml) {
    const input = jsYaml.safeLoad(yaml);

    return {
      ...input,
      command: commandParse(input.command),
    };
  }

  const json = core.getInput('json');

  if (json) {
    const input = JSON.parse(json);

    return {
      ...input,
      command: commandParse(input.command),
    };
  }

  throw new Error('Missing `yaml` or `json` input');
};
