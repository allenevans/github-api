import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
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

  test('Issue.deleteIssueComment', async () => {
    const input = mockConfigLoader(`
        command: Issue.deleteIssueComment
        repo: owner/repo
        args: 123456
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.deleteIssueComment).toHaveBeenCalledWith(...mockArgs);
  });
});
