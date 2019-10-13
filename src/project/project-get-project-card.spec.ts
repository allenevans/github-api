import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getProjectCard: jest.fn(),

  getProject: (id: string) =>
    Promise.resolve({
      getProjectCard: mockGitHub.getProjectCard,
    }),
};

describe('Project.getProjectCard', () => {
  beforeEach(() => {
    mockGitHub.getProjectCard.mockImplementation(() =>
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
    it('should have getProjectCard method', () => {
      const api = new GitHub().getProject('123456');

      expect(api.getProjectCard).toBeDefined();
    });
  });

  test('Project.getProjectCard', async () => {
    const input = mockConfigLoader(`
        command: Project.getProjectCard
        id: 123456
        args: 777777
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
    expect(mockGitHub.getProjectCard).toHaveBeenCalledWith(...mockArgs);
  });
});
