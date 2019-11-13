import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getLabel: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      getLabel: mockGitHub.getLabel,
    }),
};

describe('Issue.getLabel', () => {
  beforeEach(() => {
    mockGitHub.getLabel.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getIssues');
  });

  const mockArgs = ['my label'];

  describe('getIssues', () => {
    it('should have getLabel method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.getLabel).toBeDefined();
    });
  });

  test('Issue.getLabel', async () => {
    const input = mockConfigLoader(`
        command: Issue.getLabel
        repo : owner/repo
        args: my label
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.getLabel).toHaveBeenCalledWith(...mockArgs);
  });
});
