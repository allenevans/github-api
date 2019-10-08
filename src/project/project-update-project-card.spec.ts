import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  updateProjectCard: jest.fn(),

  getProject: (id: string) =>
    Promise.resolve({
      updateProjectCard: mockGitHub.updateProjectCard,
    }),
};

describe('Project.updateProjectCard', () => {
  beforeEach(() => {
    mockGitHub.updateProjectCard.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getProject');
  });

  const mockArgs = [
    27478739,
    {
      note: 'go live',
      archived: true,
    },
  ];

  describe('getProject', () => {
    it('should have updateProjectCard method', () => {
      const api = new GitHub().getProject('123456');

      expect(api.updateProjectCard).toBeDefined();
    });
  });

  describe('json', () => {
    test('Project.updateProjectCard', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Project.updateProjectCard",
              "id": 123456,
              "args": [
                27478739,
                {
                  "note": "go live",
                  "archived": true
                }
              ]
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.updateProjectCard).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Project.updateProjectCard', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Project.updateProjectCard
            id: 123456
            args:
              - 27478739
              - note: go live
                archived: true
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.updateProjectCard).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
