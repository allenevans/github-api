import jsYaml from 'js-yaml';
import { ActionInput } from '../types/action-input';
import { commandParse } from './command-parse';
import { stringToBoolean } from './boolean-utils';

const toArray = (input: any) => (Array.isArray(input) ? input : [input]);

const parseArgs = (argsInput: string): any[] => {
  if (!argsInput) {
    return [];
  }

  if (typeof argsInput !== 'string') {
    return toArray(argsInput);
  }

  if (/^[{\[]/.test(argsInput.trim())) {
    return toArray(JSON.parse(argsInput));
  }

  return toArray(jsYaml.safeLoad(argsInput));
};

export const ensureDefaults = (input: any): ActionInput => ({
  ...input,
  command: commandParse(input.command),
  select: input.select || input.jq,
  token: input.token || '',
});

export const inputParse: (getInput: Function) => ActionInput = (getInput) =>
  ensureDefaults({
    args: parseArgs(getInput('args') || ''),
    command: getInput('command'),
    id: getInput('id'),
    ignoreErrors: stringToBoolean(getInput('ignoreErrors') || getInput('ignore_errors')),
    organization: getInput('organization') || getInput('org'),
    repo: getInput('repository') || getInput('repo'),
    select: getInput('select'),
    token: getInput('token'),
    user: getInput('user'),
  });
