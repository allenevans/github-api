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
  const { data, headers, status } = await (await api)[method](...args);

  return jq.json({ data, headers, status }, transform || transformDefaults[method] || '.');
};
