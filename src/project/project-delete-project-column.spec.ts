import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  deleteProjectColumn: jest.fn(),

  getProject: (id: string) =>
    Promise.resolve({
      deleteProjectColumn: mockGitHub.deleteProjectColumn,
    }),
};

describe('Project.deleteProjectColumn', () => {
  beforeEach(() => {
    mockGitHub.deleteProjectColumn.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getProject');
  });

  const mockArgs = [
    777777,
  ];

  describe('getProject', () => {
    it('should have deleteProjectColumn method', () => {
      const api = new GitHub().getProject('123456');

      expect(api.deleteProjectColumn).toBeDefined();
    });
  });

  describe('json', () => {
    test('Project.deleteProjectColumn', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Project.deleteProjectColumn",
              "id": 123456,
              "args": [
                777777
              ]
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.deleteProjectColumn).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Project.deleteProjectColumn', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Project.deleteProjectColumn
            id: 123456
            args:
              - 777777
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.deleteProjectColumn).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
