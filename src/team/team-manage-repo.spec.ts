import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  manageRepo: jest.fn(),

  getTeam: (id: number) =>
    Promise.resolve({
      manageRepo: mockGitHub.manageRepo,
    }),
};

describe('Team.manageRepo', () => {
  beforeEach(() => {
    mockGitHub.manageRepo.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getTeam');
  });

  const mockArgs: any[] = [
    'owner',
    'repository',
    {
      permission: 'admin',
    },
  ];

  describe('getTeam', () => {
    it('should have manageRepo method', () => {
      const api = new GitHub().getTeam(123456);

      expect(api.manageRepo).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Team.manageRepo', async () => {
      const input = mockConfigLoader(`
        command: Team.manageRepo
        id: 123456
        args: |
          [
            "owner",
            "repository",
            {
              "permission": "admin"
            }
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getTeam).toHaveBeenCalledWith(123456);
      expect(mockGitHub.manageRepo).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Team.manageRepo', async () => {
      const input = mockConfigLoader(`
        command: Team.manageRepo
        id: 123456
        args: |
          - owner
          - repository
          - permission: admin
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getTeam).toHaveBeenCalledWith(123456);
      expect(mockGitHub.manageRepo).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
