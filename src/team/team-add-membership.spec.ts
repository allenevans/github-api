import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  addMembership: jest.fn(),

  getTeam: (id: number) =>
    Promise.resolve({
      addMembership: mockGitHub.addMembership,
    }),
};

describe('Team.addMembership', () => {
  beforeEach(() => {
    mockGitHub.addMembership.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getTeam');
  });

  const mockArgs: any[] = ['username', { role: 'maintainer' }];

  describe('getTeam', () => {
    it('should have addMembership method', () => {
      const api = new GitHub().getTeam(123456);

      expect(api.addMembership).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Team.addMembership', async () => {
      const input = mockConfigLoader(`
        command: Team.addMembership
        id: 123456
        args: |
          [
            "username",
            {
              "role": "maintainer"
            }
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getTeam).toHaveBeenCalledWith(123456);
      expect(mockGitHub.addMembership).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Team.addMembership', async () => {
      const input = mockConfigLoader(`
        command: Team.addMembership
        id: 123456
        args: |
          - username
          - role: maintainer
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getTeam).toHaveBeenCalledWith(123456);
      expect(mockGitHub.addMembership).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
