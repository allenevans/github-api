import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  createKey: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      createKey: mockGitHub.createKey,
    }),
};

describe('Repository.createKey', () => {
  beforeEach(() => {
    mockGitHub.createKey.mockImplementation(() =>
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
      title: 'octocat@octomac',
      key: 'ssh-rsa AAA...',
      read_only: true,
    },
  ];

  describe('getRepo', () => {
    it('should have createKey method', () => {
      const api = new GitHub().getRepo();

      expect(api.createKey).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.createKey', async () => {
      const input = mockConfigLoader(`
        command: Repository.createKey
        repo: owner/repo
        args: |
          {
            "title": "octocat@octomac",
            "key": "ssh-rsa AAA...",
            "read_only": true
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createKey).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.createKey', async () => {
      const input = mockConfigLoader(`
        command: Repository.createKey
        repo: owner/repo
        args: |
          title: octocat@octomac
          key: ssh-rsa AAA...
          read_only: true
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createKey).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
