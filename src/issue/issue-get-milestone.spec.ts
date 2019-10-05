import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getMilestone: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      getMilestone: mockGitHub.getMilestone,
    }),
};

describe('Issue.getMilestone', () => {
  beforeEach(() => {
    mockGitHub.getMilestone.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getIssues');
  });

  const mockArgs = [1];

  describe('getIssues', () => {
    it('should have getMilestone method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.getMilestone).toBeDefined();
    });
  });

  describe('json', () => {
    test('Issue.getMilestone', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Issue.getMilestone",
              "repo": "owner/repo",
              "args": [
                1
              ]
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.getMilestone).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Issue.getMilestone', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Issue.getMilestone
            repo : owner/repo
            args:
              - 1
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.getMilestone).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
