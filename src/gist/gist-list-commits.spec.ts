import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
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

  test('Gist.listCommits', async () => {
    const input = mockConfigLoader(`
        command: Gist.listCommits
        id: eb07a99bc427a3d3ce899d305f960000
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
    expect(mockGitHub.mockListCommits).toHaveBeenCalledWith(...mockArgs);
  });
});
