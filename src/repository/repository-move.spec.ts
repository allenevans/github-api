import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  move: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      move: mockGitHub.move,
    }),
};

describe('Repository.move', () => {
  beforeEach(() => {
    mockGitHub.move.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = [
    'next-feature',
    'src/index.js',
    'src/index.ts',
  ];

  describe('getRepo', () => {
    it('should have move method', () => {
      const api = new GitHub().getRepo();

      expect(api.move).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.move', async () => {
      const input = mockConfigLoader(`
        command: Repository.move
        repo: owner/repo
        args: |
          [
            "next-feature",
            "src/index.js",
            "src/index.ts"
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.move).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.move', async () => {
      const input = mockConfigLoader(`
        command: Repository.move
        repo: owner/repo
        args: |
          - next-feature
          - src/index.js
          - src/index.ts
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.move).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
