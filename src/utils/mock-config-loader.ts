import jsYaml from 'js-yaml';
import { ActionInput } from '../types/action-input';
import { commandParse } from './command-parse';

export const mockConfigLoader = (config: string): ActionInput => {
  const {
    with: { json, yaml },
  } = jsYaml.safeLoad(config);

  if (yaml) {
    const input = jsYaml.safeLoad(yaml);

    return {
      ...input,
      command: commandParse(input.command),
    };
  }

  if (json) {
    const input = JSON.parse(json);

    return {
      ...input,
      command: commandParse(input.command),
    };
  }

  throw new Error('Missing `yaml` or `json` input');
};
