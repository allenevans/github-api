import { ActionInput } from '../types/action-input';
import { execCommand } from '../exec-command';

const transformDefaults: Record<string, string> = {
  create: '.data.id',
  createComment: '.data.id',
  delete: '.status',
  deleteComment: '.status',
  editComment: '.data.id',
  fork: '.data.id',
  getComment: '.data.body',
  update: '.data.history[0].version',
};

export default (github: any) => async (input: ActionInput): Promise<string> =>
  execCommand({
    input,
    transformDefaults,
    api: github.getGist(input.id),
  });
