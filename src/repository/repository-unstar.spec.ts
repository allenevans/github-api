import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  unstar: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      unstar: mockGitHub.unstar,
    }),
};

describe('Repository.unstar', () => {
  beforeEach(() => {
    mockGitHub.unstar.mockImplementation(() =>
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
    it('should have unstar method', () => {
      const api = new GitHub().getRepo();

      expect(api.unstar).toBeDefined();
    });
  });

  test('Repository.unstar', async () => {
    const input = mockConfigLoader(`
        command: Repository.unstar
        repo: owner/repo
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.unstar).toHaveBeenCalledWith(...mockArgs);
  });
});
