import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  unmanageRepo: jest.fn(),

  getTeam: (id: number) =>
    Promise.resolve({
      unmanageRepo: mockGitHub.unmanageRepo,
    }),
};

describe('Team.unmanageRepo', () => {
  beforeEach(() => {
    mockGitHub.unmanageRepo.mockImplementation(() =>
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
  ];

  describe('getTeam', () => {
    it('should have unmanageRepo method', () => {
      const api = new GitHub().getTeam(123456);

      expect(api.unmanageRepo).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Team.unmanageRepo', async () => {
      const input = mockConfigLoader(`
        command: Team.unmanageRepo
        id: 123456
        args: |
          [
            "owner",
            "repository"
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getTeam).toHaveBeenCalledWith(123456);
      expect(mockGitHub.unmanageRepo).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Team.unmanageRepo', async () => {
      const input = mockConfigLoader(`
        command: Team.unmanageRepo
        id: 123456
        args: |
          - owner
          - repository
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getTeam).toHaveBeenCalledWith(123456);
      expect(mockGitHub.unmanageRepo).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
