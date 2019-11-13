import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listKeys: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      listKeys: mockGitHub.listKeys,
    }),
};

describe('Repository.listKeys', () => {
  beforeEach(() => {
    mockGitHub.listKeys.mockImplementation(() =>
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
    it('should have listKeys method', () => {
      const api = new GitHub().getRepo();

      expect(api.listKeys).toBeDefined();
    });
  });

  test('Repository.listKeys', async () => {
    const input = mockConfigLoader(`
        command: Repository.listKeys
        repo: owner/repo
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.listKeys).toHaveBeenCalledWith(...mockArgs);
  });
});
