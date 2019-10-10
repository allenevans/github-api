import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  createBlob: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      createBlob: mockGitHub.createBlob,
    }),
};

describe('Repository.createBlob', () => {
  beforeEach(() => {
    mockGitHub.createBlob.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = ['hello world'];

  describe('getRepo', () => {
    it('should have createBlob method', () => {
      const api = new GitHub().getRepo();

      expect(api.createBlob).toBeDefined();
    });
  });

  describe('json', () => {
    test('Repository.createBlob', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Repository.createBlob",
              "repo": "owner/repo",
              "args": ["hello world"]
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createBlob).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Repository.createBlob', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Repository.createBlob
            repo: owner/repo
            args:
              - hello world
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createBlob).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
