import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  listStarredRepos: jest.fn(),

  getUser: (id: number) =>
    Promise.resolve({
      listStarredRepos: mockGitHub.listStarredRepos,
    }),
};

describe('User.listStarredRepos', () => {
  beforeEach(() => {
    mockGitHub.listStarredRepos.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getUser');
  });

  const mockArgs: any[] = [];

  describe('getUser', () => {
    it('should have listStarredRepos method', () => {
      const api = new GitHub().getUser('super-user');

      expect(api.listStarredRepos).toBeDefined();
    });
  });

  test('User.listStarredRepos', async () => {
    const input = mockConfigLoader(`
        command: User.listStarredRepos
        user: super-user
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getUser).toHaveBeenCalledWith('super-user');
    expect(mockGitHub.listStarredRepos).toHaveBeenCalledWith(...mockArgs);
  });
});
