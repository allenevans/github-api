import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
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

  test('Gist.read', async () => {
    const input = mockConfigLoader(`
        command: Gist.read
        id: eb07a99bc427a3d3ce899d305f960000
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
    expect(mockGitHub.read).toHaveBeenCalledWith(...mockArgs);
  });
});
