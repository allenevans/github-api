import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listCommits: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      listCommits: mockGitHub.listCommits,
    }),
};

describe('Repository.listCommits', () => {
  beforeEach(() => {
    mockGitHub.listCommits.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = [{
    sha: '38f1b7d29f972783022cbb239bd7bd83c5af647c',
    path: 'artifacts/package-topology.json',
    author: undefined,
    since: undefined,
    until: undefined,
  }];

  describe('getRepo', () => {
    it('should have listCommits method', () => {
      const api = new GitHub().getRepo();

      expect(api.listCommits).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.listCommits', async () => {
      const input = mockConfigLoader(`
        command: Repository.listCommits
        repo: owner/repo
        args: |
          {
            "sha": "38f1b7d29f972783022cbb239bd7bd83c5af647c",
            "path": "artifacts/package-topology.json"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.listCommits).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.listCommits', async () => {
      const input = mockConfigLoader(`
        command: Repository.listCommits
        repo: owner/repo
        args: |
          sha: 38f1b7d29f972783022cbb239bd7bd83c5af647c
          path: artifacts/package-topology.json
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.listCommits).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
