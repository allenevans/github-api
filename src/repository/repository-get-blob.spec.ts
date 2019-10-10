import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getBlob: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      getBlob: mockGitHub.getBlob,
    }),
};

describe('Repository.getBlob', () => {
  beforeEach(() => {
    mockGitHub.getBlob.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = ['000086fb8db8eea7ccbb9a95f325ddbedfb20000'];

  describe('getRepo', () => {
    it('should have getBlob method', () => {
      const api = new GitHub().getRepo();

      expect(api.getBlob).toBeDefined();
    });
  });

  describe('json', () => {
    test('Repository.getBlob', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Repository.getBlob",
              "repo": "owner/repo",
              "args": [
                "000086fb8db8eea7ccbb9a95f325ddbedfb20000"
              ]
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.getBlob).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Repository.getBlob', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Repository.getBlob
            repo: owner/repo
            args:
              - 000086fb8db8eea7ccbb9a95f325ddbedfb20000
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.getBlob).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
