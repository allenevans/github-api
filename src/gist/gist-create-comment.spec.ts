import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  mockCreateComment: jest.fn(),

  getGist: (id?: string) =>
    Promise.resolve({
      createComment: mockGitHub.mockCreateComment,
    }),
};

describe('Gist.createComment', () => {
  beforeEach(() => {
    mockGitHub.mockCreateComment.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getGist');
  });

  const mockGistCreateArgs = 'a comment';

  describe('getGist', () => {
    it('should have createComment method', () => {
      const api = new GitHub().getGist();

      expect(api.createComment).toBeDefined();
    });
  });

  test('Gist.createComment', async () => {
    const input = mockConfigLoader(`
        command: Gist.createComment
        id: eb07a99bc427a3d3ce899d305f960000
        args: a comment
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
    expect(mockGitHub.mockCreateComment).toHaveBeenCalledWith(mockGistCreateArgs);
  });
});
