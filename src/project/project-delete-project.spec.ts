import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  deleteProject: jest.fn(),

  getProject: (id: string) =>
    Promise.resolve({
      deleteProject: mockGitHub.deleteProject,
    }),
};

describe('Project.deleteProject', () => {
  beforeEach(() => {
    mockGitHub.deleteProject.mockImplementation(() =>
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
    it('should have deleteProject method', () => {
      const api = new GitHub().getProject('123456');

      expect(api.deleteProject).toBeDefined();
    });
  });

  test('Project.deleteProject', async () => {
    const input = mockConfigLoader(`
        command: Project.deleteProject
        id: 123456
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
    expect(mockGitHub.deleteProject).toHaveBeenCalledWith(...mockArgs);
  });
});
