import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  listFollowing: jest.fn(),

  getUser: (id: number) =>
    Promise.resolve({
      listFollowing: mockGitHub.listFollowing,
    }),
};

describe('User.listFollowing', () => {
  beforeEach(() => {
    mockGitHub.listFollowing.mockImplementation(() =>
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
    it('should have listFollowing method', () => {
      const api = new GitHub().getUser('super-user');

      expect(api.listFollowing).toBeDefined();
    });
  });

  test('User.listFollowing', async () => {
    const input = mockConfigLoader(`
        command: User.listFollowing
        user: super-user
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getUser).toHaveBeenCalledWith('super-user');
    expect(mockGitHub.listFollowing).toHaveBeenCalledWith(...mockArgs);
  });
});
