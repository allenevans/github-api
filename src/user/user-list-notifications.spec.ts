import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  listNotifications: jest.fn(),

  getUser: (id: number) =>
    Promise.resolve({
      listNotifications: mockGitHub.listNotifications,
    }),
};

describe('User.listNotifications', () => {
  beforeEach(() => {
    mockGitHub.listNotifications.mockImplementation(() =>
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
      all: true,
      participating: true,
      before: '2020-01-01T00:00:00Z',
      after: '2019-01-01T00:00:00Z',
    },
  ];

  describe('getUser', () => {
    it('should have listNotifications method', () => {
      const api = new GitHub().getUser('super-user');

      expect(api.listNotifications).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('User.listNotifications', async () => {
      const input = mockConfigLoader(`
        command: User.listNotifications
        user: super-user
        args: |
          {
            "all": true,
            "participating": true,
            "before": "2020-01-01T00:00:00Z",
            "after": "2019-01-01T00:00:00Z"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getUser).toHaveBeenCalledWith('super-user');
      expect(mockGitHub.listNotifications).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('User.listNotifications', async () => {
      const input = mockConfigLoader(`
        command: User.listNotifications
        user: super-user
        args: |
          all: true
          participating: true
          before: '2020-01-01T00:00:00Z'
          after: '2019-01-01T00:00:00Z'
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getUser).toHaveBeenCalledWith('super-user');
      expect(mockGitHub.listNotifications).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
