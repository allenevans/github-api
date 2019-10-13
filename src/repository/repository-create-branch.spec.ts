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

  describe('json arguments', () => {
    test('Repository.createBranch', async () => {
      const input = mockConfigLoader(`
        command: Repository.createBranch
        repo: owner/repo
        args: ["master", "hotfix"]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createBranch).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.createBranch', async () => {
      const input = mockConfigLoader(`
        command: Repository.createBranch
        repo: owner/repo
        args: |
          - master
          - hotfix
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createBranch).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
