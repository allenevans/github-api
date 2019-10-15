import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listHooks: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      listHooks: mockGitHub.listHooks,
    }),
};

describe('Repository.listHooks', () => {
  beforeEach(() => {
    mockGitHub.listHooks.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs: any[] = [];

  describe('getRepo', () => {
    it('should have listHooks method', () => {
      const api = new GitHub().getRepo();

      expect(api.listHooks).toBeDefined();
    });
  });

  test('Repository.listHooks', async () => {
    const input = mockConfigLoader(`
        command: Repository.listHooks
        repo: owner/repo
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.listHooks).toHaveBeenCalledWith(...mockArgs);
  });
});
