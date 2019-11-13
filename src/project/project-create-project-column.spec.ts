import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  createProjectColumn: jest.fn(),

  getProject: (id: string) =>
    Promise.resolve({
      createProjectColumn: mockGitHub.createProjectColumn,
    }),
};

describe('Project.createProjectColumn', () => {
  beforeEach(() => {
    mockGitHub.createProjectColumn.mockImplementation(() =>
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
      name: 'Backlog',
    },
  ];

  describe('getProject', () => {
    it('should have createProjectColumn method', () => {
      const api = new GitHub().getProject('123456');

      expect(api.createProjectColumn).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Project.createProjectColumn', async () => {
      const input = mockConfigLoader(`
        command: Project.createProjectColumn
        id: 123456
        args: |
          {
            "name": "Backlog"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.createProjectColumn).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Project.createProjectColumn', async () => {
      const input = mockConfigLoader(`
        command: Project.createProjectColumn
        id: 123456
        args: |
          name: Backlog
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.createProjectColumn).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
