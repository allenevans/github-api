import { ActionInput } from '../types/action-input';
import { execCommand } from '../exec-command';

const selectDefaults: Record<string, string> = {
  commit: '.data',
  compareBranches: '.data',
  createBlob: '.data',
  createBranch: '.data',
  createHook: '.data',
  createKey: '.data',
  createProject: '.data',
  createPullRequest: '.data',
  createRef: '.data',
  createRelease: '.data',
  createTree: '.data',
  deleteFile: 'if .status == 204 then true else false end',
  deleteHook: 'if .status == 204 then true else false end',
  deleteKey: 'if .status == 204 then true else false end',
  deleteRef: 'if .status == 204 then true else false end',
  deleteRelease: 'if .status == 204 then true else false end',
  getBlob: '.data',
  getBranch: '.data',
  getCollaborators: '.data',
};

export default (github: any) => async (input: ActionInput): Promise<string> => {
  if (!input.repo || !input.repo.includes('/')) {
    return Promise.reject(new Error('full repo name is required e.g. :owner/:repo'));
  }

  return execCommand({
    input,
    selectDefaults,
    api: github.getRepo(...input.repo.split('/')),
  });
};
