import { ActionInput } from '../types/action-input';
import { execCommand } from '../exec-command';

const selectDefaults: Record<string, string> = {
  createProject: '.data',
  createRepo: '.data',
  createTeam: '.data',
  getRepos: '.data',
  getTeams: '.data',
  isMember: '.data',
  listMembers: '.data',
  listProjects: '.data',
};

export default (github: any) => async (input: ActionInput): Promise<string> => {
  if (!input.organization) {
    return Promise.reject(new Error('organization is required'));
  }

  return execCommand({
    input,
    selectDefaults,
    api: github.getOrganization(input.organization),
  });
};
