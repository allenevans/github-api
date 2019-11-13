import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
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

  describe('getGist', () => {
    it('should have deleteComment method', () => {
      const api = new GitHub().getGist();

      expect(api.deleteComment).toBeDefined();
    });
  });

  const mockGistDeleteArgs = 123456;

  test('Gist.deleteComment', async () => {
    const input = mockConfigLoader(`
        command: Gist.deleteComment
        id: eb07a99bc427a3d3ce899d305f960000
        args: 123456
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
    expect(mockGitHub.mockDeleteComment).toHaveBeenCalledWith(mockGistDeleteArgs);
  });
});
