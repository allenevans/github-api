import jsYaml from 'js-yaml';
import { ActionInput } from '../types/action-input';
import { inputParse } from './input-parse';

export const mockConfigLoader = (configStr: string): ActionInput => {
  const config = jsYaml.safeLoad(configStr);

  return inputParse((key: string) => config[key]);
};
