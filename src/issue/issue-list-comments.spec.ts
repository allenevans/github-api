import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listIssueComments: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      listIssueComments: mockGitHub.listIssueComments,
    }),
};

describe('Issue.listIssueComments', () => {
  beforeEach(() => {
    mockGitHub.listIssueComments.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getIssues');
  });

  const mockArgs = [
    123456,
  ];

  describe('getIssues', () => {
    it('should have listIssueComments method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.listIssueComments).toBeDefined();
    });
  });

  describe('json', () => {
    test('Issue.listIssueComments', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Issue.listIssueComments",
              "repo": "owner/repo",
              "args": [
                123456
              ]
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.listIssueComments).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Issue.listIssueComments', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Issue.listIssueComments
            repo : owner/repo
            args:
              - 123456
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.listIssueComments).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
