import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getContributorStats: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      getContributorStats: mockGitHub.getContributorStats,
    }),
};

describe('Repository.getContributorStats', () => {
  beforeEach(() => {
    mockGitHub.getContributorStats.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs: any[] = [];

  describe('getRepo', () => {
    it('should have getContributorStats method', () => {
      const api = new GitHub().getRepo();

      expect(api.getContributorStats).toBeDefined();
    });
  });

  test('Repository.getContributorStats', async () => {
    const input = mockConfigLoader(`
        command: Repository.getContributorStats
        repo: owner/repo
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.getContributorStats).toHaveBeenCalledWith(...mockArgs);
  });
});
