import GitHub from 'github-api';
import gist from './gist';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  read: jest.fn(),

  getGist: (id?: string) =>
    Promise.resolve({
      read: mockGitHub.read,
    }),
};

describe('Gist.read', () => {
  beforeEach(() => {
    mockGitHub.read.mockImplementation(() =>
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
    it('should have read method', () => {
      const api = new GitHub().getGist();

      expect(api.read).toBeDefined();
    });
  });

  describe('json', () => {
    test('Gist.read', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Gist.read",
              "id": "eb07a99bc427a3d3ce899d305f960000"
            }
      `);

      await gist(mockGitHub)(input);

      expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
      expect(mockGitHub.read).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Gist.read', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Gist.read
            id: eb07a99bc427a3d3ce899d305f960000
      `);

      await gist(mockGitHub)(input);

      expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
      expect(mockGitHub.read).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
