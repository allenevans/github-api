import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  mockDelete: jest.fn(),

  getGist: (id?: string) =>
    Promise.resolve({
      delete: mockGitHub.mockDelete,
    }),
};

describe('Gist.delete', () => {
  beforeEach(() => {
    mockGitHub.mockDelete.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getGist');
  });

  describe('getGist', () => {
    it('should have delete method', () => {
      const api = new GitHub().getGist();

      expect(api.delete).toBeDefined();
    });
  });

  test('Gist.delete', async () => {
    const input = mockConfigLoader(`
      command: Gist.delete
      id: eb07a99bc427a3d3ce899d305f960000
    `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
    expect(mockGitHub.mockDelete).toHaveBeenCalledWith();
  });
});
