import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  moveProjectColumn: jest.fn(),

  getProject: (id: string) =>
    Promise.resolve({
      moveProjectColumn: mockGitHub.moveProjectColumn,
    }),
};

describe('Project.moveProjectColumn', () => {
  beforeEach(() => {
    mockGitHub.moveProjectColumn.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getProject');
  });

  const mockArgs: any[] = [6724776, 'last'];

  describe('getProject', () => {
    it('should have moveProjectColumn method', () => {
      const api = new GitHub().getProject('123456');

      expect(api.moveProjectColumn).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Project.moveProjectColumn', async () => {
      const input = mockConfigLoader(`
        command: Project.moveProjectColumn
        id: 123456
        args: |
          [
            6724776,
            "last"
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.moveProjectColumn).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Project.moveProjectColumn', async () => {
      const input = mockConfigLoader(`
        command: Project.moveProjectColumn
        id: 123456
        args: |
          - 6724776
          - last
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.moveProjectColumn).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
