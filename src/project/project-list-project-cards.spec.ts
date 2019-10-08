import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listProjectCards: jest.fn(),

  getProject: (id: string) =>
    Promise.resolve({
      listProjectCards: mockGitHub.listProjectCards,
    }),
};

describe('Project.listProjectCards', () => {
  beforeEach(() => {
    mockGitHub.listProjectCards.mockImplementation(() =>
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
    it('should have listProjectCards method', () => {
      const api = new GitHub().getProject('123456');

      expect(api.listProjectCards).toBeDefined();
    });
  });

  describe('json', () => {
    test('Project.listProjectCards', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Project.listProjectCards",
              "id": 123456
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.listProjectCards).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Project.listProjectCards', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Project.listProjectCards
            id: 123456
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
      expect(mockGitHub.listProjectCards).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
