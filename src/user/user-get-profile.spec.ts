import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  getProfile: jest.fn(),

  getUser: (id: number) =>
    Promise.resolve({
      getProfile: mockGitHub.getProfile,
    }),
};

describe('User.getProfile', () => {
  beforeEach(() => {
    mockGitHub.getProfile.mockImplementation(() =>
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
    it('should have getProfile method', () => {
      const api = new GitHub().getUser('super-user');

      expect(api.getProfile).toBeDefined();
    });
  });

  test('User.getProfile', async () => {
    const input = mockConfigLoader(`
        command: User.getProfile
        user: super-user
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getUser).toHaveBeenCalledWith('super-user');
    expect(mockGitHub.getProfile).toHaveBeenCalledWith(...mockArgs);
  });
});
