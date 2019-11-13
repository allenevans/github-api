import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getContents: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      getContents: mockGitHub.getContents,
    }),
};

describe('Repository.getContents', () => {
  beforeEach(() => {
    mockGitHub.getContents.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = ['refs/head/master', 'src', false];

  describe('getRepo', () => {
    it('should have getContents method', () => {
      const api = new GitHub().getRepo();

      expect(api.getContents).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.getContents', async () => {
      const input = mockConfigLoader(`
        command: Repository.getContents
        repo: owner/repo
        args: |
          [
            "refs/head/master",
            "src",
            false
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.getContents).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.getContents', async () => {
      const input = mockConfigLoader(`
        command: Repository.getContents
        repo: owner/repo
        args: |
          - refs/head/master
          - src
          - false
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.getContents).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
