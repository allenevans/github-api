import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  writeFile: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      writeFile: mockGitHub.writeFile,
    }),
};

describe('Repository.writeFile', () => {
  beforeEach(() => {
    mockGitHub.writeFile.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = [
    'master',
    'README.md',
    'encoded content ...',
    'committing content',
    {
      author: 'bob',
      committer: undefined,
      encode: 'utf-8',
    },
  ];

  describe('getRepo', () => {
    it('should have writeFile method', () => {
      const api = new GitHub().getRepo();

      expect(api.writeFile).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.writeFile', async () => {
      const input = mockConfigLoader(`
        command: Repository.writeFile
        repo: owner/repo
        args: |
          [
            "master",
            "README.md",
            "encoded content ...",
            "committing content",
            {
              "author": "bob",
              "encode": "utf-8"
            }
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.writeFile).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.writeFile', async () => {
      const input = mockConfigLoader(`
        command: Repository.writeFile
        repo: owner/repo
        args: |
          - master
          - README.md
          - encoded content ...
          - committing content
          - author: bob
            encode: utf-8
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.writeFile).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
