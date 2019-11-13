import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  updateRelease: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      updateRelease: mockGitHub.updateRelease,
    }),
};

describe('Repository.updateRelease', () => {
  beforeEach(() => {
    mockGitHub.updateRelease.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = [
    123,
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
    it('should have updateRelease method', () => {
      const api = new GitHub().getRepo();

      expect(api.updateRelease).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.updateRelease', async () => {
      const input = mockConfigLoader(`
        command: Repository.updateRelease
        repo: owner/repo
        args: |
          [
            123,
            {
              "tag_name": "v1.0.0",
              "target_commitish": "master",
              "name": "v1.0.0",
              "body": "Release description",
              "draft": false,
              "prerelease": false
            }
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.updateRelease).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.updateRelease', async () => {
      const input = mockConfigLoader(`
        command: Repository.updateRelease
        repo: owner/repo
        args: |
          - 123
          - tag_name: v1.0.0
            target_commitish: master
            name: v1.0.0
            body: Release description
            draft: false
            prerelease: false
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.updateRelease).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
