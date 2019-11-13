import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  star: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      star: mockGitHub.star,
    }),
};

describe('Repository.star', () => {
  beforeEach(() => {
    mockGitHub.star.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs: any[] = [];

  describe('getRepo', () => {
    it('should have star method', () => {
      const api = new GitHub().getRepo();

      expect(api.star).toBeDefined();
    });
  });

  test('Repository.star', async () => {
    const input = mockConfigLoader(`
        command: Repository.star
        repo: owner/repo
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.star).toHaveBeenCalledWith(...mockArgs);
  });
});
