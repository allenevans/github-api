import { ActionInput } from '../types/action-input';
import { execCommand } from '../exec-command';

const transformDefaults: Record<string, string> = {
  deleteRef: '.status',
};

export default (github: any) => async (input: ActionInput): Promise<string> =>
  execCommand({
    input,
    transformDefaults,
    api: github.getRepo(input.id),
  });
