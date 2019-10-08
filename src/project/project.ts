import { ActionInput } from '../types/action-input';
import { execCommand } from '../exec-command';

const selectDefaults: Record<string, string> = {
  createProjectCard: '.data.id',
  createProjectColumn: '.data.id',
  deleteProjectCard: 'if .status == 204 then true else false end',
  deleteProjectColumn: 'if .status == 204 then true else false end',
  getProject: '.data',
  getProjectCard: '.data',
  getProjectColumn: '.data',
  listColumnCards: '.data',
  listProjectCards: '.data',
  listProjectColumns: '.data',
  moveProjectCard: 'if .status == 201 then true else false end',
};

export default (github: any) => async (input: ActionInput): Promise<string> => {
  if (!input.id) {
    return Promise.reject(new Error('id is required'));
  }

  return execCommand({
    input,
    selectDefaults,
    api: github.getProject(input.id),
  });
};
