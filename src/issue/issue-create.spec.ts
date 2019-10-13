import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  createIssue: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      createIssue: mockGitHub.createIssue,
    }),
};

describe('Issue.createIssue', () => {
  beforeEach(() => {
    mockGitHub.createIssue.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getIssues');
  });

  const mockArgs = {
    title: 'we have a problem',
    body: 'to be defined',
  };

  describe('getIssues', () => {
    it('should have createIssue method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.createIssue).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Issue.createIssue', async () => {
      const input = mockConfigLoader(`
        command: Issue.createIssue
        repo: owner/repo
        args: |
          {
            "title": "we have a problem",
            "body": "to be defined"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createIssue).toHaveBeenCalledWith(mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Issue.createIssue', async () => {
      const input = mockConfigLoader(`
        command: Issue.createIssue
        repo : owner/repo
        args: |
          title: we have a problem
          body: to be defined
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createIssue).toHaveBeenCalledWith(mockArgs);
    });
  });
});
