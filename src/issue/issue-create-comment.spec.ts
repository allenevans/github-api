import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
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

  describe('json arguments', () => {
    test('Issue.createIssueComment', async () => {
      const input = mockConfigLoader(`
        command: Issue.createIssueComment
        repo: owner/repo
        args: |
          [
            123456,
            "that is an issue"
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createIssueComment).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Issue.createIssueComment', async () => {
      const input = mockConfigLoader(`
        command: Issue.createIssueComment
        repo: owner/repo
        args:
          - 123456
          - that is an issue
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createIssueComment).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
