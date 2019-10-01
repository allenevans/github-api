import GitHub from 'github-api';
import repository from './issue';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  createIssueComment: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      createIssueComment: mockGitHub.createIssueComment,
    }),
};

describe('Issue.createIssueComment', () => {
  beforeEach(() => {
    mockGitHub.createIssueComment.mockImplementation(() =>
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
    'that is an issue',
  ];

  describe('getIssues', () => {
    it('should have createIssueComment method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.createIssueComment).toBeDefined();
    });
  });

  describe('json', () => {
    test('Issue.createIssueComment', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Issue.createIssueComment",
              "repo": "owner/repo",
              "args": [
                123456,
                "that is an issue"
              ]
            }
      `);

      await repository(mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createIssueComment).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Issue.createIssueComment', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Issue.createIssueComment
            repo: owner/repo
            args:
              - 123456
              - that is an issue
      `);

      await repository(mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createIssueComment).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
