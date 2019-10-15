import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getTree: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      getTree: mockGitHub.getTree,
    }),
};

describe('Repository.getTree', () => {
  beforeEach(() => {
    mockGitHub.getTree.mockImplementation(() =>
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
    it('should have getTree method', () => {
      const api = new GitHub().getRepo();

      expect(api.getTree).toBeDefined();
    });
  });

  test('Repository.getTree', async () => {
    const input = mockConfigLoader(`
        command: Repository.getTree
        repo: owner/repo
        args: 2650f145def9b02e7bcc370e3f15383a2e544ee7
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.getTree).toHaveBeenCalledWith(...mockArgs);
  });
});
