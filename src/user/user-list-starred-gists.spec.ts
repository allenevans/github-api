import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  listStarredGists: jest.fn(),

  getUser: (id: number) =>
    Promise.resolve({
      listStarredGists: mockGitHub.listStarredGists,
    }),
};

describe('User.listStarredGists', () => {
  beforeEach(() => {
    mockGitHub.listStarredGists.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getUser');
  });

  const mockArgs: any[] = [
    {
      since: '2019-01-01T00:00:00Z',
    },
  ];

  describe('getUser', () => {
    it('should have listStarredGists method', () => {
      const api = new GitHub().getUser('super-user');

      expect(api.listStarredGists).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('User.listStarredGists', async () => {
      const input = mockConfigLoader(`
        command: User.listStarredGists
        user: super-user
        args: |
          {
            "since": "2019-01-01T00:00:00Z"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getUser).toHaveBeenCalledWith('super-user');
      expect(mockGitHub.listStarredGists).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('User.listStarredGists', async () => {
      const input = mockConfigLoader(`
        command: User.listStarredGists
        user: super-user
        args: |
          since: '2019-01-01T00:00:00Z'
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getUser).toHaveBeenCalledWith('super-user');
      expect(mockGitHub.listStarredGists).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
