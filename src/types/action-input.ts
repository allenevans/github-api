import { ActionCommand } from './action-command';

export interface ActionInput {
  apiBase?: string;
  command: ActionCommand;
  args: any[];
  token: string;
  transform?: string;
}
