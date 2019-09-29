import { commandParse } from './command-parse';

describe('command parse', () => {
  it('should get the api class from the command string', () => {
    const command = 'Gist.create';

    const { apiClass } = commandParse(command);

    expect(apiClass).toBe('Gist');
  });

  it('should get the method to call on the class from the command string', () => {
    const command = 'Repository.getBranch';

    const { method } = commandParse(command);

    expect(method).toBe('getBranch');
  });
});
