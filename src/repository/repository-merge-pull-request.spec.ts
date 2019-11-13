import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  mergePullRequest: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      mergePullRequest: mockGitHub.mergePullRequest,
    }),
};

describe('Repository.mergePullRequest', () => {
  beforeEach(() => {
    mockGitHub.mergePullRequest.mockImplementation(() =>
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
      commit_title: 'next big feature',
      commit_message: 'this is the one',
      sha: '2650f145def9b02e7bcc370e3f15383a2e544ee7',
      merge_method: 'rebase',
    },
  ];

  describe('getRepo', () => {
    it('should have mergePullRequest method', () => {
      const api = new GitHub().getRepo();

      expect(api.mergePullRequest).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.mergePullRequest', async () => {
      const input = mockConfigLoader(`
        command: Repository.mergePullRequest
        repo: owner/repo
        args: |
          [
            123,
            {
              "commit_title": "next big feature",
              "commit_message": "this is the one",
              "sha": "2650f145def9b02e7bcc370e3f15383a2e544ee7",
              "merge_method": "rebase"
            }
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.mergePullRequest).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.mergePullRequest', async () => {
      const input = mockConfigLoader(`
        command: Repository.mergePullRequest
        repo: owner/repo
        args: |
          - 123
          - commit_title: next big feature
            commit_message: this is the one
            sha: 2650f145def9b02e7bcc370e3f15383a2e544ee7
            merge_method: rebase
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.mergePullRequest).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
