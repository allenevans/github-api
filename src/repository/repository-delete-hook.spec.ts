import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  deleteHook: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      deleteHook: mockGitHub.deleteHook,
    }),
};

describe('Repository.deleteHook', () => {
  beforeEach(() => {
    mockGitHub.deleteHook.mockImplementation(() =>
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
    it('should have deleteHook method', () => {
      const api = new GitHub().getRepo();

      expect(api.deleteHook).toBeDefined();
    });
  });

  test('Repository.deleteHook', async () => {
    const input = mockConfigLoader(`
        command: Repository.deleteHook
        repo: owner/repo
        args: 123456
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.deleteHook).toHaveBeenCalledWith(...mockArgs);
  });
});
