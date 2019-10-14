import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getContributors: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      getContributors: mockGitHub.getContributors,
    }),
};

describe('Repository.getContributors', () => {
  beforeEach(() => {
    mockGitHub.getContributors.mockImplementation(() =>
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
    it('should have getContributors method', () => {
      const api = new GitHub().getRepo();

      expect(api.getContributors).toBeDefined();
    });
  });

  test('Repository.getContributors', async () => {
    const input = mockConfigLoader(`
        command: Repository.getContributors
        repo: owner/repo
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.getContributors).toHaveBeenCalledWith(...mockArgs);
  });
});
