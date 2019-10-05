import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  deleteMilestone: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      deleteMilestone: mockGitHub.deleteMilestone,
    }),
};

describe('Issue.deleteMilestone', () => {
  beforeEach(() => {
    mockGitHub.deleteMilestone.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getIssues');
  });

  const mockArgs = ['1'];

  describe('getIssues', () => {
    it('should have deleteMilestone method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.deleteMilestone).toBeDefined();
    });
  });

  describe('json', () => {
    test('Issue.deleteMilestone', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Issue.deleteMilestone",
              "repo": "owner/repo",
              "args": ["1"]
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.deleteMilestone).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Issue.deleteMilestone', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Issue.deleteMilestone
            repo: owner/repo
            args:
              - '1'
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.deleteMilestone).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
