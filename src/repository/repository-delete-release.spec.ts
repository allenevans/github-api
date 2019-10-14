import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  deleteRelease: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      deleteRelease: mockGitHub.deleteRelease,
    }),
};

describe('Repository.deleteRelease', () => {
  beforeEach(() => {
    mockGitHub.deleteRelease.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = [123456];

  describe('getRepo', () => {
    it('should have deleteRelease method', () => {
      const api = new GitHub().getRepo();

      expect(api.deleteRelease).toBeDefined();
    });
  });

  test('Repository.deleteRelease', async () => {
    const input = mockConfigLoader(`
        command: Repository.deleteRelease
        repo: owner/repo
        args: 123456
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.deleteRelease).toHaveBeenCalledWith(...mockArgs);
  });
});
