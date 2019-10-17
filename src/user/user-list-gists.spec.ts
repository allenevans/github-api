import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  listGists: jest.fn(),

  getUser: (id: number) =>
    Promise.resolve({
      listGists: mockGitHub.listGists,
    }),
};

describe('User.listGists', () => {
  beforeEach(() => {
    mockGitHub.listGists.mockImplementation(() =>
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
    it('should have listGists method', () => {
      const api = new GitHub().getUser('super-user');

      expect(api.listGists).toBeDefined();
    });
  });

  test('User.listGists', async () => {
    const input = mockConfigLoader(`
        command: User.listGists
        user: super-user
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getUser).toHaveBeenCalledWith('super-user');
    expect(mockGitHub.listGists).toHaveBeenCalledWith(...mockArgs);
  });
});
