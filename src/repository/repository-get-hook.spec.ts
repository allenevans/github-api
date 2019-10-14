import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getHook: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      getHook: mockGitHub.getHook,
    }),
};

describe('Repository.getHook', () => {
  beforeEach(() => {
    mockGitHub.getHook.mockImplementation(() =>
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
    it('should have getHook method', () => {
      const api = new GitHub().getRepo();

      expect(api.getHook).toBeDefined();
    });
  });

  test('Repository.getHook', async () => {
    const input = mockConfigLoader(`
        command: Repository.getHook
        repo: owner/repo
        args: 123456
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.getHook).toHaveBeenCalledWith(...mockArgs);
  });
});
