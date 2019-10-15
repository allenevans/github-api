import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getSha: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      getSha: mockGitHub.getSha,
    }),
};

describe('Repository.getSha', () => {
  beforeEach(() => {
    mockGitHub.getSha.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = ['feature-branch', 'HEAD'];

  describe('getRepo', () => {
    it('should have getSha method', () => {
      const api = new GitHub().getRepo();

      expect(api.getSha).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.getSha', async () => {
      const input = mockConfigLoader(`
        command: Repository.getSha
        repo: owner/repo
        args: |
          [
            "feature-branch",
            "HEAD"
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.getSha).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.getSha', async () => {
      const input = mockConfigLoader(`
        command: Repository.getSha
        repo: owner/repo
        args: |
          - feature-branch
          - HEAD
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.getSha).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
