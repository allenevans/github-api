import { ActionInput } from '../types/action-input';
import { execCommand } from '../exec-command';

const selectDefaults: Record<string, string> = {
  forCode: '.data',
  forIssues: '.data',
  forRepositories: '.data',
  forUsers: '.data',
};

export default (github: any) => async (input: ActionInput): Promise<string> =>
  execCommand({
    input,
    selectDefaults,
    api: github.search(),
  });
