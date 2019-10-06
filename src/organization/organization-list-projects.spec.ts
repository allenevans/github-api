import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  listProjects: jest.fn(),

  getOrganization: (organization: string) =>
    Promise.resolve({
      listProjects: mockGitHub.listProjects,
    }),
};

describe('Organization.listProjects', () => {
  beforeEach(() => {
    mockGitHub.listProjects.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getOrganization');
  });

  const mockArgs: any[] = [];

  describe('getOrganization', () => {
    it('should have listProjects method', () => {
      const api = new GitHub().getOrganization('my-org');

      expect(api.listProjects).toBeDefined();
    });
  });

  describe('json', () => {
    test('Organization.listProjects', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Organization.listProjects",
              "organization": "my-org"
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getOrganization).toHaveBeenCalledWith('my-org');
      expect(mockGitHub.listProjects).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Organization.listProjects', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Organization.listProjects
            organization: my-org
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getOrganization).toHaveBeenCalledWith('my-org');
      expect(mockGitHub.listProjects).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
