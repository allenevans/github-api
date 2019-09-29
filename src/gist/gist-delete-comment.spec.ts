import gist from './gist';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  mockDeleteComment: jest.fn(),

  getGist: (id?: string) =>
    Promise.resolve({
      deleteComment: mockGitHub.mockDeleteComment,
    }),
};

describe('Gist.deleteComment', () => {
  beforeEach(() => {
    mockGitHub.mockDeleteComment.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getGist');
  });

  const mockGistDeleteArgs = 123456;

  describe('json', () => {
    test('Gist.deleteComment', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Gist.deleteComment",
              "id": "eb07a99bc427a3d3ce899d305f960000",
              "args": [
                123456
              ]
            }
      `);

      await gist(mockGitHub)(input);

      expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
      expect(mockGitHub.mockDeleteComment).toHaveBeenCalledWith(mockGistDeleteArgs);
    });
  });

  describe('yaml', () => {
    test('Gist.deleteComment', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Gist.deleteComment
            id: eb07a99bc427a3d3ce899d305f960000
            args:
              - 123456
      `);

      await gist(mockGitHub)(input);

      expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
      expect(mockGitHub.mockDeleteComment).toHaveBeenCalledWith(mockGistDeleteArgs);
    });
  });
});
