import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  deleteProjectCard: jest.fn(),

  getProject: (id: string) =>
    Promise.resolve({
      deleteProjectCard: mockGitHub.deleteProjectCard,
    }),
};

describe('Project.deleteProjectCard', () => {
  beforeEach(() => {
    mockGitHub.deleteProjectCard.mockImplementation(() =>
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
    it('should have deleteProjectCard method', () => {
      const api = new GitHub().getProject('123456');

      expect(api.deleteProjectCard).toBeDefined();
    });
  });

  test('Project.deleteProjectCard', async () => {
    const input = mockConfigLoader(`
        command: Project.deleteProjectCard
        id: 123456
        args: 777777
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
    expect(mockGitHub.deleteProjectCard).toHaveBeenCalledWith(...mockArgs);
  });
});
