import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  createBranch: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      createBranch: mockGitHub.createBranch,
    }),
};

describe('Repository.createBranch', () => {
  beforeEach(() => {
    mockGitHub.createBranch.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = ['master', 'hotfix'];

  describe('getRepo', () => {
    it('should have createBranch method', () => {
      const api = new GitHub().getRepo();

      expect(api.createBranch).toBeDefined();
    });
  });

  describe('json', () => {
    test('Repository.createBranch', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Repository.createBranch",
              "repo": "owner/repo",
              "args": ["master", "hotfix"]
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createBranch).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Repository.createBranch', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Repository.createBranch
            repo: owner/repo
            args:
              - master
              - hotfix
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createBranch).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
