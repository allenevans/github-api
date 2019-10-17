import { ActionInput } from '../types/action-input';
import { execCommand } from '../exec-command';

const selectDefaults: Record<string, string> = {
  createRepo: '.data',
  follow: 'if .status == 204 then true else false end',
  getEmails: '.data',
  getProfile: '.data',
  listFollowers: '.data',
  listFollowing: '.data',
  listGists: '.data',
  listNotifications: '.data',
  listOrgs: '.data',
  listRepos: '.data',
  listStarredGists: '.data',
  listStarredRepos: '.data',
};

export default (github: any) => async (input: ActionInput): Promise<string> => {
  if (!input.user) {
    return Promise.reject(new Error('user is required'));
  }

  return execCommand({
    input,
    selectDefaults,
    api: github.getUser(input.user),
  });
};
