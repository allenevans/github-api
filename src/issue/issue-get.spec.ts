import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getIssue: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      getIssue: mockGitHub.getIssue,
    }),
};

describe('Issue.getIssue', () => {
  beforeEach(() => {
    mockGitHub.getIssue.mockImplementation(() =>
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
    it('should have getIssue method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.getIssue).toBeDefined();
    });
  });

  describe('json', () => {
    test('Issue.getIssue', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Issue.getIssue",
              "repo": "owner/repo",
              "args": [
                123456
              ]
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.getIssue).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Issue.getIssue', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Issue.getIssue
            repo : owner/repo
            args:
              - 123456
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.getIssue).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
