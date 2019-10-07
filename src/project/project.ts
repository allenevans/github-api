import { ActionInput } from '../types/action-input';
import { execCommand } from '../exec-command';

const selectDefaults: Record<string, string> = {
  createProjectColumn: '.data.id',
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
