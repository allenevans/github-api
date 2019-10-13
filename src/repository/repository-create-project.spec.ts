import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  createProject: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      createProject: mockGitHub.createProject,
    }),
};

describe('Repository.createProject', () => {
  beforeEach(() => {
    mockGitHub.createProject.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = [
    {
      name: 'Features Project',
      body: 'List of features to develop',
    },
  ];

  describe('getRepo', () => {
    it('should have createProject method', () => {
      const api = new GitHub().getRepo();

      expect(api.createProject).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.createProject', async () => {
      const input = mockConfigLoader(`
        command: Repository.createProject
        repo: owner/repo
        args: |
          {
            "name": "Features Project",
            "body": "List of features to develop"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createProject).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.createProject', async () => {
      const input = mockConfigLoader(`
        command: Repository.createProject
        repo: owner/repo
        args: |
          name: Features Project
          body: List of features to develop
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createProject).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
