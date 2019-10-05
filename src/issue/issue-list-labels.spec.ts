import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listLabels: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      listLabels: mockGitHub.listLabels,
    }),
};

describe('Issue.listLabels', () => {
  beforeEach(() => {
    mockGitHub.listLabels.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getIssues');
  });

  const mockArgs: any = [];

  describe('getIssues', () => {
    it('should have listLabels method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.listLabels).toBeDefined();
    });
  });

  describe('json', () => {
    test('Issue.listLabels', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Issue.listLabels",
              "repo": "owner/repo"
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.listLabels).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Issue.listLabels', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Issue.listLabels
            repo : owner/repo
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.listLabels).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
