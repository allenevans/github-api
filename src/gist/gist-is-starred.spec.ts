import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  mockIsStarred: jest.fn(),

  getGist: (id?: string) =>
    Promise.resolve({
      isStarred: mockGitHub.mockIsStarred,
    }),
};

describe('Gist.isStarred', () => {
  beforeEach(() => {
    mockGitHub.mockIsStarred.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getGist');
  });

  const mockArgs: any = [];

  describe('getGist', () => {
    it('should have isStarred method', () => {
      const api = new GitHub().getGist();

      expect(api.isStarred).toBeDefined();
    });
  });

  describe('json', () => {
    test('Gist.isStarred', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Gist.isStarred",
              "id": "eb07a99bc427a3d3ce899d305f960000"
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
      expect(mockGitHub.mockIsStarred).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Gist.isStarred', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Gist.isStarred
            id: eb07a99bc427a3d3ce899d305f960000
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
      expect(mockGitHub.mockIsStarred).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
