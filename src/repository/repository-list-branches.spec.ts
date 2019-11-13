import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listBranches: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      listBranches: mockGitHub.listBranches,
    }),
};

describe('Repository.listBranches', () => {
  beforeEach(() => {
    mockGitHub.listBranches.mockImplementation(() =>
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
    it('should have listBranches method', () => {
      const api = new GitHub().getRepo();

      expect(api.listBranches).toBeDefined();
    });
  });

  test('Repository.listBranches', async () => {
    const input = mockConfigLoader(`
        command: Repository.listBranches
        repo: owner/repo
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.listBranches).toHaveBeenCalledWith(...mockArgs);
  });
});
