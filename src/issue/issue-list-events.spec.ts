import GitHub from 'github-api';
import repository from './issue';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listIssueEvents: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      listIssueEvents: mockGitHub.listIssueEvents,
    }),
};

describe('Issue.listIssueEvents', () => {
  beforeEach(() => {
    mockGitHub.listIssueEvents.mockImplementation(() =>
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
    it('should have listIssueEvents method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.listIssueEvents).toBeDefined();
    });
  });

  describe('json', () => {
    test('Issue.listIssueEvents', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Issue.listIssueEvents",
              "repo": "owner/repo",
              "args": [
                123456
              ]
            }
      `);

      await repository(mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.listIssueEvents).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Issue.listIssueEvents', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Issue.listIssueEvents
            repo : owner/repo
            args:
              - 123456
      `);

      await repository(mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.listIssueEvents).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
