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

  const transform = select || selectDefaults[method] || '.';

  try {
    const response = await (await api)[method](...args);

    if (typeof response === 'boolean') {
      return jq.json({ data: response }, transform);
    }

    const { data, headers, status } = response;

    return jq.json({ data, headers, status }, transform);
  } catch (exception) {
    const {
      response: { data, headers, status },
    } = exception;

    return { data, headers, status, error: true };
  }
};
