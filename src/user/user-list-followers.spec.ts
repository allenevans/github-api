import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  listFollowers: jest.fn(),

  getUser: (id: number) =>
    Promise.resolve({
      listFollowers: mockGitHub.listFollowers,
    }),
};

describe('User.listFollowers', () => {
  beforeEach(() => {
    mockGitHub.listFollowers.mockImplementation(() =>
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
    it('should have listFollowers method', () => {
      const api = new GitHub().getUser('super-user');

      expect(api.listFollowers).toBeDefined();
    });
  });

  test('User.listFollowers', async () => {
    const input = mockConfigLoader(`
        command: User.listFollowers
        user: super-user
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getUser).toHaveBeenCalledWith('super-user');
    expect(mockGitHub.listFollowers).toHaveBeenCalledWith(...mockArgs);
  });
});
