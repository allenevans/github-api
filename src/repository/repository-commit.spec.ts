import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  commit: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      commit: mockGitHub.commit,
    }),
};

describe('Repository.commit', () => {
  beforeEach(() => {
    mockGitHub.commit.mockImplementation(() =>
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
      message: 'my commit message',
      author: {
        name: 'Bob',
        email: 'bob@example.com',
        date: '2019-10-10T06:19:01.397Z',
      },
      parents: [
        'd81e57c925604ec206480fddb6e66f33a5a41d3d',
      ],
      tree: '570d63f37fd10d42c6240cd54665b08a65a74de7',
      signature: '-----PGP SIGNATURE-----',
    },
  ];

  describe('getRepo', () => {
    it('should have commit method', () => {
      const api = new GitHub().getRepo();

      expect(api.commit).toBeDefined();
    });
  });

  describe('json', () => {
    test('Repository.commit', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Repository.commit",
              "repo": "owner/repo",
              "args": [
                {
                  "message": "my commit message",
                  "author": {
                    "name": "Bob",
                    "email": "bob@example.com",
                    "date": "2019-10-10T06:19:01.397Z"
                  },
                  "parents": [
                    "d81e57c925604ec206480fddb6e66f33a5a41d3d"
                  ],
                  "tree": "570d63f37fd10d42c6240cd54665b08a65a74de7",
                  "signature": "-----PGP SIGNATURE-----"
                }
              ]
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.commit).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Repository.commit', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Repository.commit
            repo: owner/repo
            args:
              - message: my commit message
                author:
                  name: Bob
                  email: bob@example.com
                  date: '2019-10-10T06:19:01.397Z'
                parents:
                  - d81e57c925604ec206480fddb6e66f33a5a41d3d
                tree: 570d63f37fd10d42c6240cd54665b08a65a74de7
                signature: -----PGP SIGNATURE-----
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.commit).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
