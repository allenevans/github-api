import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  follow: jest.fn(),

  getUser: (id: number) =>
    Promise.resolve({
      follow: mockGitHub.follow,
    }),
};

describe('User.follow', () => {
  beforeEach(() => {
    mockGitHub.follow.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getUser');
  });

  const mockArgs: any[] = [
    'follow-this-user',
  ];

  describe('getUser', () => {
    it('should have follow method', () => {
      const api = new GitHub().getUser('super-user');

      expect(api.follow).toBeDefined();
    });
  });

  test('User.follow', async () => {
    const input = mockConfigLoader(`
        command: User.follow
        user: super-user
        args: follow-this-user
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getUser).toHaveBeenCalledWith('super-user');
    expect(mockGitHub.follow).toHaveBeenCalledWith(...mockArgs);
  });
});
