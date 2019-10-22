import { ActionInput } from '../types/action-input';
import { execCommand } from '../exec-command';

const selectDefaults: Record<string, string> = {
  createIssue: '.data',
  createIssueComment: '.data',
  createMilestone: '.data',
  deleteIssueComment: 'if .status == 204 then true else false end',
  createLabel: '.data',
  deleteLabel: 'if .status == 204 then true else false end',
  deleteMilestone: 'if .status == 204 then true else false end',
  editComment: '.data',
  editIssue: '.data',
  editLabel: '.data',
  editMilestone: '.data',
  getIssue: '.data',
  getIssueComment: '.data',
  getLabel: '.data',
  getMilestone: '.data',
  listIssueComments: '.data',
  listIssueEvents: '.data',
  listIssues: '.data',
  listLabels: '.data',
  listMilestones: '.data',
};

export default (github: any) => async (input: ActionInput): Promise<string> => {
  if (!input.repo || !input.repo.includes('/')) {
    return Promise.reject(new Error('full repo name is required e.g. :owner/:repo'));
  }

  return execCommand({
    input,
    selectDefaults,
    api: github.getIssues(...input.repo.split('/')),
  });
};
