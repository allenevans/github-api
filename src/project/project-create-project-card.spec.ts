import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  createProjectCard: jest.fn(),

  getProject: (id: string) =>
    Promise.resolve({
      createProjectCard: mockGitHub.createProjectCard,
    }),
};

describe('Project.createProjectCard', () => {
  beforeEach(() => {
    mockGitHub.createProjectCard.mockImplementation(() =>
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
    {
      note: 'go live',
    },
  ];

  describe('getProject', () => {
    it('should have createProjectCard method', () => {
      const api = new GitHub().getProject('123456');

      expect(api.createProjectCard).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Project.createProjectCard', async () => {
      const input = mockConfigLoader(`
        command: Project.createProjectCard
        id: 123456
        args: |
          [
            777777,
            {
              "note": "go live"
            }
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.createProjectCard).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Project.createProjectCard', async () => {
      const input = mockConfigLoader(`
        command: Project.createProjectCard
        id: 123456
        args: |
          - 777777
          - note: go live
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.createProjectCard).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
