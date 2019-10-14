import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  createTree: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      createTree: mockGitHub.createTree,
    }),
};

describe('Repository.createTree', () => {
  beforeEach(() => {
    mockGitHub.createTree.mockImplementation(() =>
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
      base_tree: '9fb037999f264ba9a7fc6274d15fa3ae2ab98312',
      tree: [
        {
          path: 'file.js',
          mode: '100644',
          type: 'blob',
          sha: '44b4fc6d56897b048c772eb4087f854f46256132',
        },
      ],
    },
  ];

  describe('getRepo', () => {
    it('should have createTree method', () => {
      const api = new GitHub().getRepo();

      expect(api.createTree).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.createTree', async () => {
      const input = mockConfigLoader(`
        command: Repository.createTree
        repo: owner/repo
        args: |
          {
            "base_tree": "9fb037999f264ba9a7fc6274d15fa3ae2ab98312",
            "tree": [
              {
                "path": "file.js",
                "mode": "100644",
                "type": "blob",
                "sha": "44b4fc6d56897b048c772eb4087f854f46256132"
              }
            ]
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createTree).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.createTree', async () => {
      const input = mockConfigLoader(`
        command: Repository.createTree
        repo: owner/repo
        args: |
          base_tree: 9fb037999f264ba9a7fc6274d15fa3ae2ab98312
          tree:
            - path: file.js
              mode: '100644'
              type: blob
              sha: 44b4fc6d56897b048c772eb4087f854f46256132
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createTree).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
