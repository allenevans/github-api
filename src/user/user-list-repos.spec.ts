import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  listRepos: jest.fn(),

  getUser: (id: number) =>
    Promise.resolve({
      listRepos: mockGitHub.listRepos,
    }),
};

describe('User.listRepos', () => {
  beforeEach(() => {
    mockGitHub.listRepos.mockImplementation(() =>
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
      type: 'all',
      sort: 'full_name',
      direction: 'desc',
    },
  ];

  describe('getUser', () => {
    it('should have listRepos method', () => {
      const api = new GitHub().getUser('super-user');

      expect(api.listRepos).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('User.listRepos', async () => {
      const input = mockConfigLoader(`
        command: User.listRepos
        user: super-user
        args: |
          {
            "type": "all",
            "sort": "full_name",
            "direction": "desc"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getUser).toHaveBeenCalledWith('super-user');
      expect(mockGitHub.listRepos).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('User.listRepos', async () => {
      const input = mockConfigLoader(`
        command: User.listRepos
        user: super-user
        args: |
          type: all
          sort: full_name
          direction: desc
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getUser).toHaveBeenCalledWith('super-user');
      expect(mockGitHub.listRepos).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
