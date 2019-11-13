import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  createProject: jest.fn(),

  getOrganization: (organization: string) =>
    Promise.resolve({
      createProject: mockGitHub.createProject,
    }),
};

describe('Organization.createProject', () => {
  beforeEach(() => {
    mockGitHub.createProject.mockImplementation(() =>
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
      name: 'test project',
      body: 'project description',
    },
  ];

  describe('getOrganization', () => {
    it('should have createProject method', () => {
      const api = new GitHub().getOrganization('my-org');

      expect(api.createProject).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Organization.createProject', async () => {
      const input = mockConfigLoader(`
        command: Organization.createProject
        organization: my-org
        args: |
          {
            "name": "test project",
            "body": "project description"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getOrganization).toHaveBeenCalledWith('my-org');
      expect(mockGitHub.createProject).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Organization.createProject', async () => {
      const input = mockConfigLoader(`
        command: Organization.createProject
        organization: my-org
        args: |
          name: test project
          body: project description
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getOrganization).toHaveBeenCalledWith('my-org');
      expect(mockGitHub.createProject).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
