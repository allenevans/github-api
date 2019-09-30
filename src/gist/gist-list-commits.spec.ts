import GitHub from 'github-api';
import gist from './gist';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  mockListCommits: jest.fn(),

  getGist: (id?: string) =>
    Promise.resolve({
      listCommits: mockGitHub.mockListCommits,
    }),
};

describe('Gist.listCommits', () => {
  beforeEach(() => {
    mockGitHub.mockListCommits.mockImplementation(() =>
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
    it('should have listCommits method', () => {
      const api = new GitHub().getGist();

      expect(api.listCommits).toBeDefined();
    });
  });

  describe('json', () => {
    test('Gist.listCommits', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Gist.listCommits",
              "id": "eb07a99bc427a3d3ce899d305f960000"
            }
      `);

      await gist(mockGitHub)(input);

      expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
      expect(mockGitHub.mockListCommits).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Gist.listCommits', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Gist.listCommits
            id: eb07a99bc427a3d3ce899d305f960000
      `);

      await gist(mockGitHub)(input);

      expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
      expect(mockGitHub.mockListCommits).toHaveBeenCalledWith(...mockArgs);
    });
  });
});