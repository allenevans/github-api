import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  updateProject: jest.fn(),

  getProject: (id: string) =>
    Promise.resolve({
      updateProject: mockGitHub.updateProject,
    }),
};

describe('Project.updateProject', () => {
  beforeEach(() => {
    mockGitHub.updateProject.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getProject');
  });

  const mockArgs = [
    {
      name: 'test project',
      body: 'project description',
      state: 'open',
      organization_permission: 'none',
      private: false,
    },
  ];

  describe('getProject', () => {
    it('should have updateProject method', () => {
      const api = new GitHub().getProject('123456');

      expect(api.updateProject).toBeDefined();
    });
  });

  describe('json', () => {
    test('Project.updateProject', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Project.updateProject",
              "id": 123456,
              "args": [
                {
                  "name": "test project",
                  "body": "project description",
                  "state": "open",
                  "organization_permission": "none",
                  "private": false
                }
              ]
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.updateProject).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Project.updateProject', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Project.updateProject
            id: 123456
            args:
              - name: 'test project'
                body: 'project description'
                state: 'open'
                organization_permission: 'none'
                private: false
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.updateProject).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
