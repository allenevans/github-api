import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  fork: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      fork: mockGitHub.fork,
    }),
};

describe('Repository.fork', () => {
  beforeEach(() => {
    mockGitHub.fork.mockImplementation(() =>
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
    it('should have fork method', () => {
      const api = new GitHub().getRepo();

      expect(api.fork).toBeDefined();
    });
  });

  test('Repository.fork', async () => {
    const input = mockConfigLoader(`
        command: Repository.fork
        repo: owner/repo
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.fork).toHaveBeenCalledWith(...mockArgs);
  });
});
