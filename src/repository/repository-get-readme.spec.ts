import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getReadme: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      getReadme: mockGitHub.getReadme,
    }),
};

describe('Repository.getReadme', () => {
  beforeEach(() => {
    mockGitHub.getReadme.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = ['HEAD', true];

  describe('getRepo', () => {
    it('should have getReadme method', () => {
      const api = new GitHub().getRepo();

      expect(api.getReadme).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.getReadme', async () => {
      const input = mockConfigLoader(`
        command: Repository.getReadme
        repo: owner/repo
        args: |
          [
            "HEAD",
            true
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.getReadme).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.getReadme', async () => {
      const input = mockConfigLoader(`
        command: Repository.getReadme
        repo: owner/repo
        args: |
          - HEAD
          - true
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.getReadme).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
