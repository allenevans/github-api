import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  moveProjectCard: jest.fn(),

  getProject: (id: string) =>
    Promise.resolve({
      moveProjectCard: mockGitHub.moveProjectCard,
    }),
};

describe('Project.moveProjectCard', () => {
  beforeEach(() => {
    mockGitHub.moveProjectCard.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getProject');
  });

  const mockArgs: any[] = [
    27478739,
    'bottom',
    6724776,
  ];

  describe('getProject', () => {
    it('should have moveProjectCard method', () => {
      const api = new GitHub().getProject('123456');

      expect(api.moveProjectCard).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Project.moveProjectCard', async () => {
      const input = mockConfigLoader(`
        command: Project.moveProjectCard
        id: 123456
        args: |
          [
            27478739,
            "bottom",
            6724776
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.moveProjectCard).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Project.moveProjectCard', async () => {
      const input = mockConfigLoader(`
        command: Project.moveProjectCard
        id: 123456
        args: |
          - 27478739
          - bottom
          - 6724776
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.moveProjectCard).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
