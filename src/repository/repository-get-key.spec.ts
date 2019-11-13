import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getKey: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      getKey: mockGitHub.getKey,
    }),
};

describe('Repository.getKey', () => {
  beforeEach(() => {
    mockGitHub.getKey.mockImplementation(() =>
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
    it('should have getKey method', () => {
      const api = new GitHub().getRepo();

      expect(api.getKey).toBeDefined();
    });
  });

  test('Repository.getKey', async () => {
    const input = mockConfigLoader(`
        command: Repository.getKey
        repo: owner/repo
        args: 123456
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.getKey).toHaveBeenCalledWith(...mockArgs);
  });
});
