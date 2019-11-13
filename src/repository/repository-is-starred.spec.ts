import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  isStarred: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      isStarred: mockGitHub.isStarred,
    }),
};

describe('Repository.isStarred', () => {
  beforeEach(() => {
    mockGitHub.isStarred.mockImplementation(() =>
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
    it('should have isStarred method', () => {
      const api = new GitHub().getRepo();

      expect(api.isStarred).toBeDefined();
    });
  });

  test('Repository.isStarred', async () => {
    const input = mockConfigLoader(`
        command: Repository.isStarred
        repo: owner/repo
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.isStarred).toHaveBeenCalledWith(...mockArgs);
  });
});
