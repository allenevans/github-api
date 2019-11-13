import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  mockGetComment: jest.fn(),

  getGist: (id?: string) =>
    Promise.resolve({
      getComment: mockGitHub.mockGetComment,
    }),
};

describe('Gist.getComment', () => {
  beforeEach(() => {
    mockGitHub.mockGetComment.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getGist');
  });

  const mockArgs = [123456];

  describe('getGist', () => {
    it('should have getComment method', () => {
      const api = new GitHub().getGist();

      expect(api.getComment).toBeDefined();
    });
  });

  test('Gist.getComment', async () => {
    const input = mockConfigLoader(`
        command: Gist.getComment
        id: eb07a99bc427a3d3ce899d305f960000
        args: 123456
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
    expect(mockGitHub.mockGetComment).toHaveBeenCalledWith(...mockArgs);
  });
});
