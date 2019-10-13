import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  unstar: jest.fn(),

  getGist: (id?: string) =>
    Promise.resolve({
      unstar: mockGitHub.unstar,
    }),
};

describe('Gist.unstar', () => {
  beforeEach(() => {
    mockGitHub.unstar.mockImplementation(() =>
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
    it('should have unstar method', () => {
      const api = new GitHub().getGist();

      expect(api.unstar).toBeDefined();
    });
  });

  test('Gist.unstar', async () => {
    const input = mockConfigLoader(`
        command: Gist.unstar
        id: eb07a99bc427a3d3ce899d305f960000
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
    expect(mockGitHub.unstar).toHaveBeenCalledWith(...mockArgs);
  });
});
