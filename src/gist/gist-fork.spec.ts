import GitHub from 'github-api';
import gist from './gist';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  mockFork: jest.fn(),

  getGist: (id?: string) =>
    Promise.resolve({
      fork: mockGitHub.mockFork,
    }),
};

describe('Gist.fork', () => {
  beforeEach(() => {
    mockGitHub.mockFork.mockImplementation(() =>
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
    it('should have fork method', () => {
      const api = new GitHub().getGist();

      expect(api.fork).toBeDefined();
    });
  });

  describe('json', () => {
    test('Gist.fork', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Gist.fork",
              "id": "eb07a99bc427a3d3ce899d305f960000"
            }
      `);

      await gist(mockGitHub)(input);

      expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
      expect(mockGitHub.mockFork).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Gist.fork', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Gist.fork
            id: eb07a99bc427a3d3ce899d305f960000
      `);

      await gist(mockGitHub)(input);

      expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
      expect(mockGitHub.mockFork).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
