import GitHub from 'github-api';
import repository from './issue';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  deleteIssueComment: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      deleteIssueComment: mockGitHub.deleteIssueComment,
    }),
};

describe('Issue.deleteIssueComment', () => {
  beforeEach(() => {
    mockGitHub.deleteIssueComment.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getIssues');
  });

  const mockArgs = [123456];

  describe('getIssues', () => {
    it('should have deleteIssueComment method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.deleteIssueComment).toBeDefined();
    });
  });

  describe('json', () => {
    test('Issue.deleteIssueComment', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Issue.deleteIssueComment",
              "id": "user/repo",
              "args": [
                123456
              ]
            }
      `);

      await repository(mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('user', 'repo');
      expect(mockGitHub.deleteIssueComment).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Issue.deleteIssueComment', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Issue.deleteIssueComment
            id: user/repo
            args:
              - 123456
      `);

      await repository(mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('user', 'repo');
      expect(mockGitHub.deleteIssueComment).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
