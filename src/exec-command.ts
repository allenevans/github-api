import jq from 'jq-web';
import { ActionInput } from './types/action-input';

type ExecCommand = {
  api: Promise<any>;
  input: ActionInput;
  transformDefaults: Record<string, string>;
};

export const execCommand = async ({ api, input, transformDefaults }: ExecCommand) => {
  const {
    args,
    command: { method },
    transform,
  } = input;
  const response = await (await api)[method](...args);

  if (typeof response === 'boolean') {
    return jq.json({ data: response }, transform || transformDefaults[method] || '.');
  }

  const { data, headers, status } = response;

  return jq.json({ data, headers, status }, transform || transformDefaults[method] || '.');
};
