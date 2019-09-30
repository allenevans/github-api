import GitHub from 'github-api';
import gist from './gist';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  mockListComments: jest.fn(),

  getGist: (id?: string) =>
    Promise.resolve({
      listComments: mockGitHub.mockListComments,
    }),
};

describe('Gist.listComments', () => {
  beforeEach(() => {
    mockGitHub.mockListComments.mockImplementation(() =>
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
    it('should have listComments method', () => {
      const api = new GitHub().getGist();

      expect(api.listComments).toBeDefined();
    });
  });

  describe('json', () => {
    test('Gist.listComments', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Gist.listComments",
              "id": "eb07a99bc427a3d3ce899d305f960000"
            }
      `);

      await gist(mockGitHub)(input);

      expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
      expect(mockGitHub.mockListComments).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Gist.listComments', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Gist.listComments
            id: eb07a99bc427a3d3ce899d305f960000
      `);

      await gist(mockGitHub)(input);

      expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
      expect(mockGitHub.mockListComments).toHaveBeenCalledWith(...mockArgs);
    });
  });
});