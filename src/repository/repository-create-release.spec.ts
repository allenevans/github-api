import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  createRelease: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      createRelease: mockGitHub.createRelease,
    }),
};

describe('Repository.createRelease', () => {
  beforeEach(() => {
    mockGitHub.createRelease.mockImplementation(() =>
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
      tag_name: 'v1.0.0',
      target_commitish: 'master',
      name: 'v1.0.0',
      body: 'Release description',
      draft: false,
      prerelease: false,
    },
  ];

  describe('getRepo', () => {
    it('should have createRelease method', () => {
      const api = new GitHub().getRepo();

      expect(api.createRelease).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.createRelease', async () => {
      const input = mockConfigLoader(`
        command: Repository.createRelease
        repo: owner/repo
        args: |
          {
            "tag_name": "v1.0.0",
            "target_commitish": "master",
            "name": "v1.0.0",
            "body": "Release description",
            "draft": false,
            "prerelease": false
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createRelease).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.createRelease', async () => {
      const input = mockConfigLoader(`
        command: Repository.createRelease
        repo: owner/repo
        args: |
          tag_name: v1.0.0
          target_commitish: master
          name: v1.0.0
          body: Release description
          draft: false
          prerelease: false
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createRelease).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
