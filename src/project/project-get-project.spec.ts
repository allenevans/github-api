import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  mockGetProject: jest.fn(),

  getProject: (id: string) =>
    Promise.resolve({
      getProject: mockGitHub.mockGetProject,
    }),
};

describe('Project.getProject', () => {
  beforeEach(() => {
    mockGitHub.mockGetProject.mockImplementation(() =>
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
    it('should have mockGetProject method', () => {
      const api = new GitHub().getProject('123456');

      expect(api.getProject).toBeDefined();
    });
  });

  test('Project.getProject', async () => {
    const input = mockConfigLoader(`
        command: Project.getProject
        id: 123456
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
    expect(mockGitHub.mockGetProject).toHaveBeenCalledWith(...mockArgs);
  });
});
