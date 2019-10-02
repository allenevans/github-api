import { ActionInput } from '../types/action-input';
import { execCommand } from '../exec-command';

const selectDefaults: Record<string, string> = {
  create: '.data.id',
  createComment: '.data.id',
  delete: 'if .status == 204 then true else false end',
  deleteComment: 'if .status == 204 then true else false end',
  editComment: '.data.id',
  fork: '.data.id',
  getComment: '.data',
  getRevision: '.data.files',
  isStarred: '.data',
  listComments: '.data',
  listCommits: '.data',
  read: '.data',
  star: 'if .status == 204 then true else false end',
  unstar: 'if .status == 204 then true else false end',
  update: '.data.history[0].version',
};

export default (github: any) => async (input: ActionInput): Promise<string> =>
  execCommand({
    input,
    selectDefaults,
    api: github.getGist(input.id),
  });
