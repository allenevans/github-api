import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  mockEditComment: jest.fn(),

  getGist: (id?: string) =>
    Promise.resolve({
      editComment: mockGitHub.mockEditComment,
    }),
};

describe('Gist.editComment', () => {
  beforeEach(() => {
    mockGitHub.mockEditComment.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getGist');
  });

  const mockArgs = [123456, 'updated comment'];

  describe('getGist', () => {
    it('should have editComment method', () => {
      const api = new GitHub().getGist();

      expect(api.editComment).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Gist.editComment', async () => {
      const input = mockConfigLoader(`
        command: Gist.editComment
        id: eb07a99bc427a3d3ce899d305f960000
        args: [
          123456,
          "updated comment"
        ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
      expect(mockGitHub.mockEditComment).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Gist.editComment', async () => {
      const input = mockConfigLoader(`
        command: Gist.editComment
        id: eb07a99bc427a3d3ce899d305f960000
        args: |
          - 123456
          - updated comment
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
      expect(mockGitHub.mockEditComment).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
