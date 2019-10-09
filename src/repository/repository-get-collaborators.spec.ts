import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getCollaborators: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      getCollaborators: mockGitHub.getCollaborators,
    }),
};

describe('Repository.getCollaborators', () => {
  beforeEach(() => {
    mockGitHub.getCollaborators.mockImplementation(() =>
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
    it('should have getCollaborators method', () => {
      const api = new GitHub().getRepo();

      expect(api.getCollaborators).toBeDefined();
    });
  });

  describe('json', () => {
    test('Repository.getCollaborators', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Repository.getCollaborators",
              "repo": "owner/repo"
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.getCollaborators).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Repository.getCollaborators', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Repository.getCollaborators
            repo: owner/repo
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.getCollaborators).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
