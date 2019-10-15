import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listPullRequestFiles: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      listPullRequestFiles: mockGitHub.listPullRequestFiles,
    }),
};

describe('Repository.listPullRequestFiles', () => {
  beforeEach(() => {
    mockGitHub.listPullRequestFiles.mockImplementation(() =>
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
    it('should have listPullRequestFiles method', () => {
      const api = new GitHub().getRepo();

      expect(api.listPullRequestFiles).toBeDefined();
    });
  });

  test('Repository.listPullRequestFiles', async () => {
    const input = mockConfigLoader(`
        command: Repository.listPullRequestFiles
        repo: owner/repo
        args: 1
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.listPullRequestFiles).toHaveBeenCalledWith(...mockArgs);
  });
});
