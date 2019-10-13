import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getProjectColumn: jest.fn(),

  getProject: (id: string) =>
    Promise.resolve({
      getProjectColumn: mockGitHub.getProjectColumn,
    }),
};

describe('Project.getProjectColumn', () => {
  beforeEach(() => {
    mockGitHub.getProjectColumn.mockImplementation(() =>
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
    it('should have getProjectColumn method', () => {
      const api = new GitHub().getProject('123456');

      expect(api.getProjectColumn).toBeDefined();
    });
  });

  test('Project.getProjectColumn', async () => {
    const input = mockConfigLoader(`
        command: Project.getProjectColumn
        id: 123456
        args: 777777
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
    expect(mockGitHub.getProjectColumn).toHaveBeenCalledWith(...mockArgs);
  });
});
