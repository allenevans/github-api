import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  deleteLabel: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      deleteLabel: mockGitHub.deleteLabel,
    }),
};

describe('Issue.deleteLabel', () => {
  beforeEach(() => {
    mockGitHub.deleteLabel.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getIssues');
  });

  const mockArgs = ['good first issue'];

  describe('getIssues', () => {
    it('should have deleteLabel method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.deleteLabel).toBeDefined();
    });
  });

  test('Issue.deleteLabel', async () => {
    const input = mockConfigLoader(`
        command: Issue.deleteLabel
        repo: owner/repo
        args: good first issue
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.deleteLabel).toHaveBeenCalledWith(...mockArgs);
  });
});
