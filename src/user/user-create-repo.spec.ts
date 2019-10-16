import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  createRepo: jest.fn(),

  getUser: (id: number) =>
    Promise.resolve({
      createRepo: mockGitHub.createRepo,
    }),
};

describe('User.createRepo', () => {
  beforeEach(() => {
    mockGitHub.createRepo.mockImplementation(() =>
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
      owner: 'example-corp',
      name: 'super-repo',
      description: 'super repo created by api',
      private: true,
    },
  ];

  describe('getUser', () => {
    it('should have createRepo method', () => {
      const api = new GitHub().getUser('super-user');

      expect(api.createRepo).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('User.createRepo', async () => {
      const input = mockConfigLoader(`
        command: User.createRepo
        user: super-user
        args: |
          {
            "owner": "example-corp",
            "name": "super-repo",
            "description": "super repo created by api",
            "private": true
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getUser).toHaveBeenCalledWith('super-user');
      expect(mockGitHub.createRepo).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('User.createRepo', async () => {
      const input = mockConfigLoader(`
        command: User.createRepo
        user: super-user
        args: |
          owner: example-corp
          name: super-repo
          description: super repo created by api
          private: true
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getUser).toHaveBeenCalledWith('super-user');
      expect(mockGitHub.createRepo).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
