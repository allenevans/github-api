import GitHub from 'github-api';
import repository from './issue';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  editIssueComment: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      editIssueComment: mockGitHub.editIssueComment,
    }),
};

describe('Issue.editIssueComment', () => {
  beforeEach(() => {
    mockGitHub.editIssueComment.mockImplementation(() =>
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
    'update my comment',
  ];

  describe('getIssues', () => {
    it('should have editIssueComment method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.editIssueComment).toBeDefined();
    });
  });

  describe('json', () => {
    test('Issue.editIssueComment', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Issue.editIssueComment",
              "repo": "owner/repo",
              "args": [
                123456,
                "update my comment"
              ]
            }
      `);

      await repository(mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.editIssueComment).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Issue.editIssueComment', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Issue.editIssueComment
            repo: owner/repo
            args:
              - 123456
              - update my comment
      `);

      await repository(mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.editIssueComment).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
