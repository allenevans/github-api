import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listProjectColumns: jest.fn(),

  getProject: (id: string) =>
    Promise.resolve({
      listProjectColumns: mockGitHub.listProjectColumns,
    }),
};

describe('Project.listProjectColumns', () => {
  beforeEach(() => {
    mockGitHub.listProjectColumns.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getProject');
  });

  const mockArgs: any[] = [];

  describe('getProject', () => {
    it('should have listProjectColumns method', () => {
      const api = new GitHub().getProject('123456');

      expect(api.listProjectColumns).toBeDefined();
    });
  });

  describe('json', () => {
    test('Project.listProjectColumns', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Project.listProjectColumns",
              "id": 123456
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.listProjectColumns).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Project.listProjectColumns', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Project.listProjectColumns
            id: 123456
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.listProjectColumns).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
