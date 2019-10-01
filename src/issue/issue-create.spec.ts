import GitHub from 'github-api';
import repository from './issue';
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

  describe('json', () => {
    test('Issue.createIssue', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Issue.createIssue",
              "repo": "owner/repo",
              "args": [{
                "title": "we have a problem",
                "body": "to be defined"
              }]
            }
      `);

      await repository(mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createIssue).toHaveBeenCalledWith(mockArgs);
    });
  });

  describe('yaml', () => {
    test('Issue.createIssue', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Issue.createIssue
            repo : owner/repo
            args:
              - title: we have a problem
                body: to be defined
      `);

      await repository(mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createIssue).toHaveBeenCalledWith(mockArgs);
    });
  });
});
