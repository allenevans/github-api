import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  unfollow: jest.fn(),

  getUser: (id: number) =>
    Promise.resolve({
      unfollow: mockGitHub.unfollow,
    }),
};

describe('User.unfollow', () => {
  beforeEach(() => {
    mockGitHub.unfollow.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getUser');
  });

  const mockArgs: any[] = [
    'unfollow-this-user',
  ];

  describe('getUser', () => {
    it('should have unfollow method', () => {
      const api = new GitHub().getUser('super-user');

      expect(api.unfollow).toBeDefined();
    });
  });

  test('User.unfollow', async () => {
    const input = mockConfigLoader(`
        command: User.unfollow
        user: super-user
        args: unfollow-this-user
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getUser).toHaveBeenCalledWith('super-user');
    expect(mockGitHub.unfollow).toHaveBeenCalledWith(...mockArgs);
  });
});
