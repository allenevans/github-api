import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listReleases: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      listReleases: mockGitHub.listReleases,
    }),
};

describe('Repository.listReleases', () => {
  beforeEach(() => {
    mockGitHub.listReleases.mockImplementation(() =>
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
    it('should have listReleases method', () => {
      const api = new GitHub().getRepo();

      expect(api.listReleases).toBeDefined();
    });
  });

  test('Repository.listReleases', async () => {
    const input = mockConfigLoader(`
        command: Repository.listReleases
        repo: owner/repo
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.listReleases).toHaveBeenCalledWith(...mockArgs);
  });
});
