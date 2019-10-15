import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listTags: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      listTags: mockGitHub.listTags,
    }),
};

describe('Repository.listTags', () => {
  beforeEach(() => {
    mockGitHub.listTags.mockImplementation(() =>
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
    it('should have listTags method', () => {
      const api = new GitHub().getRepo();

      expect(api.listTags).toBeDefined();
    });
  });

  test('Repository.listTags', async () => {
    const input = mockConfigLoader(`
        command: Repository.listTags
        repo: owner/repo
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.listTags).toHaveBeenCalledWith(...mockArgs);
  });
});
