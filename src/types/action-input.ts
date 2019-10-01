import { ActionCommand } from './action-command';

export interface ActionInput {
  apiBase?: string;
  command: ActionCommand;
  args: any[];
  id?: string;
  ignoreErrors: boolean;
  repo?: string;
  select?: string;
  token: string;
}
