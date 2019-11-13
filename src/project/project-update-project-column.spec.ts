import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  updateProjectColumn: jest.fn(),

  getProject: (id: string) =>
    Promise.resolve({
      updateProjectColumn: mockGitHub.updateProjectColumn,
    }),
};

describe('Project.updateProjectColumn', () => {
  beforeEach(() => {
    mockGitHub.updateProjectColumn.mockImplementation(() =>
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
      name: 'Updated Backlog',
    },
  ];

  describe('getProject', () => {
    it('should have updateProjectColumn method', () => {
      const api = new GitHub().getProject('123456');

      expect(api.updateProjectColumn).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Project.updateProjectColumn', async () => {
      const input = mockConfigLoader(`
        command: Project.updateProjectColumn
        id: 123456
        args: |
          {
            "name": "Updated Backlog"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.updateProjectColumn).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Project.updateProjectColumn', async () => {
      const input = mockConfigLoader(`
        command: Project.updateProjectColumn
        id: 123456
        args: |
          - name: Updated Backlog
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.updateProjectColumn).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
