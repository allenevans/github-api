import jsYaml from 'js-yaml';
import { ActionInput } from '../types/action-input';
import { inputParse } from './input-parse';

export const mockConfigLoader = (config: string): ActionInput => {
  const {
    with: { json, yaml },
  } = jsYaml.safeLoad(config);

  return inputParse((key: string) => {
    switch (key) {
      case 'json':
        return json;
      case 'yaml':
        return yaml;
      /* istanbul ignore next */
      default:
        return '';
    }
  });
};
