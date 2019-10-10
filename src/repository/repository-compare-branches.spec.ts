import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  compareBranches: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      compareBranches: mockGitHub.compareBranches,
    }),
};

describe('Repository.compareBranches', () => {
  beforeEach(() => {
    mockGitHub.compareBranches.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = ['38f1b7d29f972783022cbb239bd7bd83c5af647c', '2650f145def9b02e7bcc370e3f15383a2e544ee7'];

  describe('getRepo', () => {
    it('should have compareBranches method', () => {
      const api = new GitHub().getRepo();

      expect(api.compareBranches).toBeDefined();
    });
  });

  describe('json', () => {
    test('Repository.compareBranches', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Repository.compareBranches",
              "repo": "owner/repo",
              "args": [
                "38f1b7d29f972783022cbb239bd7bd83c5af647c",
                "2650f145def9b02e7bcc370e3f15383a2e544ee7"
              ]
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.compareBranches).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Repository.compareBranches', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Repository.compareBranches
            repo: owner/repo
            args:
              - 38f1b7d29f972783022cbb239bd7bd83c5af647c
              - 2650f145def9b02e7bcc370e3f15383a2e544ee7
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.compareBranches).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
