import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  deleteFile: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      deleteFile: mockGitHub.deleteFile,
    }),
};

describe('Repository.deleteFile', () => {
  beforeEach(() => {
    mockGitHub.deleteFile.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = [
    'existing-branch',
    'file.js',
  ];

  describe('getRepo', () => {
    it('should have deleteFile method', () => {
      const api = new GitHub().getRepo();

      expect(api.deleteFile).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.deleteFile', async () => {
      const input = mockConfigLoader(`
        command: Repository.deleteFile
        repo: owner/repo
        args: |
          [
            "existing-branch",
            "file.js"
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.deleteFile).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.deleteFile', async () => {
      const input = mockConfigLoader(`
        command: Repository.deleteFile
        repo: owner/repo
        args: |
          - existing-branch
          - file.js
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.deleteFile).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
