import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  deleteKey: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      deleteKey: mockGitHub.deleteKey,
    }),
};

describe('Repository.deleteKey', () => {
  beforeEach(() => {
    mockGitHub.deleteKey.mockImplementation(() =>
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
    it('should have deleteKey method', () => {
      const api = new GitHub().getRepo();

      expect(api.deleteKey).toBeDefined();
    });
  });

  test('Repository.deleteKey', async () => {
    const input = mockConfigLoader(`
        command: Repository.deleteKey
        repo: owner/repo
        args: 123456
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.deleteKey).toHaveBeenCalledWith(...mockArgs);
  });
});
