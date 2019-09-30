import { ActionInput } from '../types/action-input';
import { execCommand } from '../exec-command';

const selectDefaults: Record<string, string> = {
  createIssue: '.data.number',
  createIssueComment: '.data.id',
  deleteIssueComment: 'if .status == 204 then true else false end',
};

export default (github: any) => async (input: ActionInput): Promise<string> =>
  execCommand({
    input,
    selectDefaults,
    api: github.getIssues(...(input.id || '').split('/')),
  });
