import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  createTeam: jest.fn(),

  getOrganization: (organization: string) =>
    Promise.resolve({
      createTeam: mockGitHub.createTeam,
    }),
};

describe('Organization.createTeam', () => {
  beforeEach(() => {
    mockGitHub.createTeam.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getOrganization');
  });

  const mockArgs: any[] = [
    {
      name: 'alpha team',
      description: 'first team',
      repo_names: ['project-alpha'],
      privacy: 'secret',
    },
  ];

  describe('getOrganization', () => {
    it('should have createTeam method', () => {
      const api = new GitHub().getOrganization('my-org');

      expect(api.createTeam).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Organization.createTeam', async () => {
      const input = mockConfigLoader(`
        command: Organization.createTeam
        organization: my-org
        args: |
          {
            "name": "alpha team",
            "description": "first team",
            "repo_names": ["project-alpha"],
            "privacy": "secret"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getOrganization).toHaveBeenCalledWith('my-org');
      expect(mockGitHub.createTeam).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Organization.createTeam', async () => {
      const input = mockConfigLoader(`
        command: Organization.createTeam
        organization: my-org
        args:
          name: alpha team
          description: first team
          repo_names:
            - project-alpha
          privacy: secret
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getOrganization).toHaveBeenCalledWith('my-org');
      expect(mockGitHub.createTeam).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
