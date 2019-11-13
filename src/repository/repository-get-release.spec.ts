import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getRelease: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      getRelease: mockGitHub.getRelease,
    }),
};

describe('Repository.getRelease', () => {
  beforeEach(() => {
    mockGitHub.getRelease.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = [123];

  describe('getRepo', () => {
    it('should have getRelease method', () => {
      const api = new GitHub().getRepo();

      expect(api.getRelease).toBeDefined();
    });
  });

  test('Repository.getRelease', async () => {
    const input = mockConfigLoader(`
        command: Repository.getRelease
        repo: owner/repo
        args: 123
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.getRelease).toHaveBeenCalledWith(...mockArgs);
  });
});
