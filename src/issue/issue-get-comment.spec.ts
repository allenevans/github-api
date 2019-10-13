import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getIssueComment: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      getIssueComment: mockGitHub.getIssueComment,
    }),
};

describe('Issue.getIssueComment', () => {
  beforeEach(() => {
    mockGitHub.getIssueComment.mockImplementation(() =>
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
    it('should have getIssueComment method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.getIssueComment).toBeDefined();
    });
  });

  test('Issue.getIssueComment', async () => {
    const input = mockConfigLoader(`
        command: Issue.getIssueComment
        repo : owner/repo
        args: 123456
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.getIssueComment).toHaveBeenCalledWith(...mockArgs);
  });
});
