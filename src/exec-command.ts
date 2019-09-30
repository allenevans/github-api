import jq from 'jq-web';
import { ActionInput } from './types/action-input';

type ExecCommand = {
  api: Promise<any>;
  input: ActionInput;
  selectDefaults: Record<string, string>;
};

export const execCommand = async ({ api, input, selectDefaults }: ExecCommand) => {
  const {
    args,
    command: { method },
    select,
  } = input;
  const response = await (await api)[method](...args);

  if (typeof response === 'boolean') {
    return jq.json({ data: response }, select || selectDefaults[method] || '.');
  }

  const { data, headers, status } = response;

  return jq.json({ data, headers, status }, select || selectDefaults[method] || '.');
};
