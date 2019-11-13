import { ActionCommand } from './action-command';

export interface ActionInput {
  apiBase?: string;
  command: ActionCommand;
  args: any[];
  debug: boolean;
  id?: string;
  ignoreErrors: boolean;
  organization?: string;
  repo?: string;
  select?: string;
  token: string;
  user?: string;
}
