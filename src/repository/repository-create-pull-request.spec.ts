import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  createPullRequest: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      createPullRequest: mockGitHub.createPullRequest,
    }),
};

describe('Repository.createPullRequest', () => {
  beforeEach(() => {
    mockGitHub.createPullRequest.mockImplementation(() =>
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
      title: 'The next big feature',
      body: 'Adds new feature',
      head: 'feature-branch',
      base: 'master',
    },
  ];

  describe('getRepo', () => {
    it('should have createPullRequest method', () => {
      const api = new GitHub().getRepo();

      expect(api.createPullRequest).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.createPullRequest', async () => {
      const input = mockConfigLoader(`
        command: Repository.createPullRequest
        repo: owner/repo
        args: |
          {
            "title": "The next big feature",
            "body": "Adds new feature",
            "head": "feature-branch",
            "base": "master"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createPullRequest).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.createPullRequest', async () => {
      const input = mockConfigLoader(`
        command: Repository.createPullRequest
        repo: owner/repo
        args: |
          title: The next big feature
          body: Adds new feature
          head: feature-branch
          base: master
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createPullRequest).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
