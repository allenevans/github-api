import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getSingleCommit: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      getSingleCommit: mockGitHub.getSingleCommit,
    }),
};

describe('Repository.getSingleCommit', () => {
  beforeEach(() => {
    mockGitHub.getSingleCommit.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = ['2650f145def9b02e7bcc370e3f15383a2e544ee7'];

  describe('getRepo', () => {
    it('should have getSingleCommit method', () => {
      const api = new GitHub().getRepo();

      expect(api.getSingleCommit).toBeDefined();
    });
  });

  test('Repository.getSingleCommit', async () => {
    const input = mockConfigLoader(`
        command: Repository.getSingleCommit
        repo: owner/repo
        args: 2650f145def9b02e7bcc370e3f15383a2e544ee7
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.getSingleCommit).toHaveBeenCalledWith(...mockArgs);
  });
});
