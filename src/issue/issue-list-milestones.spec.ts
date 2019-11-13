import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listMilestones: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      listMilestones: mockGitHub.listMilestones,
    }),
};

describe('Issue.listMilestones', () => {
  beforeEach(() => {
    mockGitHub.listMilestones.mockImplementation(() =>
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
      direction: 'desc',
      sort: 'due_on',
      state: 'all',
    },
  ];

  describe('getIssues', () => {
    it('should have listMilestones method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.listMilestones).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Issue.listMilestones', async () => {
      const input = mockConfigLoader(`
        command: Issue.listMilestones
        repo: owner/repo
        args: |
          {
            "direction": "desc",
            "sort": "due_on",
            "state": "all"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.listMilestones).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Issue.listMilestones', async () => {
      const input = mockConfigLoader(`
        command: Issue.listMilestones
        repo : owner/repo
        args: |
          direction: desc
          sort: due_on
          state: all
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.listMilestones).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
