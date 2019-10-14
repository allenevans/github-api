import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getCommit: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      getCommit: mockGitHub.getCommit,
    }),
};

describe('Repository.getCommit', () => {
  beforeEach(() => {
    mockGitHub.getCommit.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = ['9395707bb20ec9374b50270a094fb85d1039a62a'];

  describe('getRepo', () => {
    it('should have getCommit method', () => {
      const api = new GitHub().getRepo();

      expect(api.getCommit).toBeDefined();
    });
  });

  test('Repository.getCommit', async () => {
    const input = mockConfigLoader(`
        command: Repository.getCommit
        repo: owner/repo
        args: 9395707bb20ec9374b50270a094fb85d1039a62a
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.getCommit).toHaveBeenCalledWith(...mockArgs);
  });
});
