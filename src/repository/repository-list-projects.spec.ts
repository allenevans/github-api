import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listProjects: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      listProjects: mockGitHub.listProjects,
    }),
};

describe('Repository.listProjects', () => {
  beforeEach(() => {
    mockGitHub.listProjects.mockImplementation(() =>
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
    it('should have listProjects method', () => {
      const api = new GitHub().getRepo();

      expect(api.listProjects).toBeDefined();
    });
  });

  test('Repository.listProjects', async () => {
    const input = mockConfigLoader(`
        command: Repository.listProjects
        repo: owner/repo
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.listProjects).toHaveBeenCalledWith(...mockArgs);
  });
});
