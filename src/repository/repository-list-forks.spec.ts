import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listForks: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      listForks: mockGitHub.listForks,
    }),
};

describe('Repository.listForks', () => {
  beforeEach(() => {
    mockGitHub.listForks.mockImplementation(() =>
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
    it('should have listForks method', () => {
      const api = new GitHub().getRepo();

      expect(api.listForks).toBeDefined();
    });
  });

  test('Repository.listForks', async () => {
    const input = mockConfigLoader(`
        command: Repository.listForks
        repo: owner/repo
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.listForks).toHaveBeenCalledWith(...mockArgs);
  });
});
