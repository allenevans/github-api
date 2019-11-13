import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  updateRepository: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      updateRepository: mockGitHub.updateRepository,
    }),
};

describe('Repository.updateRepository', () => {
  beforeEach(() => {
    mockGitHub.updateRepository.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = [
    {
      name: 'my-repo',
      description: 'my own repo',
      homepage: 'https://github.com/',
      private: true,
      has_issues: true,
      has_wiki: false,
      has_downloads: false,
      default_branch: 'master',
    },
  ];

  describe('getRepo', () => {
    it('should have updateRepository method', () => {
      const api = new GitHub().getRepo();

      expect(api.updateRepository).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.updateRepository', async () => {
      const input = mockConfigLoader(`
        command: Repository.updateRepository
        repo: owner/repo
        args: |
          {
            "name": "my-repo",
            "description": "my own repo",
            "homepage": "https://github.com/",
            "private": true,
            "has_issues": true,
            "has_wiki": false,
            "has_downloads": false,
            "default_branch": "master"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.updateRepository).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.updateRepository', async () => {
      const input = mockConfigLoader(`
        command: Repository.updateRepository
        repo: owner/repo
        args: |
          name: my-repo
          description: my own repo
          homepage: https://github.com/
          private: true
          has_issues: true
          has_wiki: false
          has_downloads: false
          default_branch: master
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.updateRepository).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
