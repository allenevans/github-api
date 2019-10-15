import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listPullRequests: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      listPullRequests: mockGitHub.listPullRequests,
    }),
};

describe('Repository.listPullRequests', () => {
  beforeEach(() => {
    mockGitHub.listPullRequests.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = [{
    state: 'open',
    head: undefined,
    base: undefined,
    sort: 'updated',
    direction: 'desc',
  }];

  describe('getRepo', () => {
    it('should have listPullRequests method', () => {
      const api = new GitHub().getRepo();

      expect(api.listPullRequests).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.listPullRequests', async () => {
      const input = mockConfigLoader(`
        command: Repository.listPullRequests
        repo: owner/repo
        args: |
          {
          "state": "open",
          "sort": "updated",
          "direction": "desc"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.listPullRequests).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.listPullRequests', async () => {
      const input = mockConfigLoader(`
        command: Repository.listPullRequests
        repo: owner/repo
        args: |
          state: open
          sort: updated
          direction: desc
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.listPullRequests).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
