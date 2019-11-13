import { ActionCommand } from '../types/action-command';

export const commandParse = (command: string) => {
  const [apiClass] = command.split('.', 1);
  const method = command.substring(command.indexOf('.') + 1);

  return <ActionCommand>{
    apiClass,
    method,
  };
};
