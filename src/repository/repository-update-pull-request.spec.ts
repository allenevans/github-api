import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  updatePullRequest: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      updatePullRequest: mockGitHub.updatePullRequest,
    }),
};

describe('Repository.updatePullRequest', () => {
  beforeEach(() => {
    mockGitHub.updatePullRequest.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = [
    123,
    {
      title: 'The next big feature',
      body: 'Adds new feature',
      head: 'feature-branch',
      base: 'master',
    },
  ];

  describe('getRepo', () => {
    it('should have updatePullRequest method', () => {
      const api = new GitHub().getRepo();

      expect(api.updatePullRequest).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.updatePullRequest', async () => {
      const input = mockConfigLoader(`
        command: Repository.updatePullRequest
        repo: owner/repo
        args: |
          [
            123,
            {
              "title": "The next big feature",
              "body": "Adds new feature",
              "head": "feature-branch",
              "base": "master"
            }
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.updatePullRequest).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.updatePullRequest', async () => {
      const input = mockConfigLoader(`
        command: Repository.updatePullRequest
        repo: owner/repo
        args: |
          - 123
          - title: The next big feature
            body: Adds new feature
            head: feature-branch
            base: master
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.updatePullRequest).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
