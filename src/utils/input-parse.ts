import jsYaml from 'js-yaml';
import { ActionInput } from '../types/action-input';
import { commandParse } from './command-parse';

export const ensureDefaults = (input: any): ActionInput => ({
  ...input,
  args: input.args || [],
  command: commandParse(input.command),
  select: input.select || input.jq,
});

export const inputParse: (getInput: Function) => ActionInput = (getInput) => {
  const yaml = getInput('yaml');

  if (yaml) {
    const input = jsYaml.safeLoad(yaml);

    return ensureDefaults(input);
  }

  const json = getInput('json');

  if (json) {
    const input = JSON.parse(json);

    return ensureDefaults(input);
  }

  throw new Error('Missing `yaml` or `json` input');
};
