import { ActionInput } from '../types/action-input';
import { execCommand } from '../exec-command';

const selectDefaults: Record<string, string> = {
  addMembership: '.data',
};

export default (github: any) => async (input: ActionInput): Promise<string> => {
  if (!input.id) {
    return Promise.reject(new Error('id for team is required'));
  }

  return execCommand({
    input,
    selectDefaults,
    api: github.getTeam(input.id),
  });
};