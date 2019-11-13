import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getPullRequest: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      getPullRequest: mockGitHub.getPullRequest,
    }),
};

describe('Repository.getPullRequest', () => {
  beforeEach(() => {
    mockGitHub.getPullRequest.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = [1];

  describe('getRepo', () => {
    it('should have getPullRequest method', () => {
      const api = new GitHub().getRepo();

      expect(api.getPullRequest).toBeDefined();
    });
  });

  test('Repository.getPullRequest', async () => {
    const input = mockConfigLoader(`
        command: Repository.getPullRequest
        repo: owner/repo
        args: 1
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.getPullRequest).toHaveBeenCalledWith(...mockArgs);
  });
});
