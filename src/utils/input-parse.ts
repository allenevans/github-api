import jsYaml from 'js-yaml';
import { ActionInput } from '../types/action-input';
import { commandParse } from './command-parse';
import { stringToBoolean } from './boolean-utils';

export const ensureDefaults = (input: any): ActionInput => ({
  ...input,
  args: input.args || [],
  command: commandParse(input.command),
  select: input.select || input.jq,
});

export const inputParse: (getInput: Function) => ActionInput = (getInput) => {
  const ignoreErrors = stringToBoolean(getInput('ignoreErrors') || getInput('ignore_errors'));
  const token = getInput('token');
  const json = getInput('json');
  const yaml = getInput('yaml');

  if (!json && !yaml) {
    throw new Error('Missing `json` or `yaml` argument');
  }

  const config = yaml ? jsYaml.safeLoad(yaml) : JSON.parse(json);

  return ensureDefaults({ ...config, ignoreErrors, token });
};
