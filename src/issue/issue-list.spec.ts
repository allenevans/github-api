import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listIssues: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      listIssues: mockGitHub.listIssues,
    }),
};

describe('Issue.listIssues', () => {
  beforeEach(() => {
    mockGitHub.listIssues.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getIssues');
  });

  const mockArgs = [
    {
      milestone: 'none',
      state: 'all',
      assignee: 'none',
      creator: 'bob',
      mentioned: 'bob',
      labels: 'bug',
      sort: 'updated',
      direction: 'desc',
      since: '2019-01-01T00:00:00Z',
    },
  ];

  describe('getIssues', () => {
    it('should have listIssues method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.listIssues).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Issue.listIssues', async () => {
      const input = mockConfigLoader(`
        command: Issue.listIssues
        repo: owner/repo
        args: |
          {
            "milestone": "none",
            "state": "all",
            "assignee": "none",
            "creator": "bob",
            "mentioned": "bob",
            "labels": "bug",
            "sort": "updated",
            "direction": "desc",
            "since": "2019-01-01T00:00:00Z"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.listIssues).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Issue.listIssues', async () => {
      const input = mockConfigLoader(`
        command: Issue.listIssues
        repo: owner/repo
        args: |
          milestone: none
          state: all
          assignee: none
          creator: bob
          mentioned: bob
          labels: bug
          sort: updated
          direction: desc
          since: '2019-01-01T00:00:00Z'
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.listIssues).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
