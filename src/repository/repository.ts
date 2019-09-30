import { ActionInput } from '../types/action-input';
import { execCommand } from '../exec-command';

const selectDefaults: Record<string, string> = {
  deleteRef: '.status',
};

export default (github: any) => async (input: ActionInput): Promise<string> =>
  execCommand({
    input,
    selectDefaults,
    api: github.getRepo(input.id),
  });
