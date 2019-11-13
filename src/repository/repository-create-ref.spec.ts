import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  createRef: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      createRef: mockGitHub.createRef,
    }),
};

describe('Repository.createRef', () => {
  beforeEach(() => {
    mockGitHub.createRef.mockImplementation(() =>
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
      ref: 'refs/heads/featureA',
      sha: '2650f145def9b02e7bcc370e3f15383a2e544ee7',
    },
  ];

  describe('getRepo', () => {
    it('should have createRef method', () => {
      const api = new GitHub().getRepo();

      expect(api.createRef).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.createRef', async () => {
      const input = mockConfigLoader(`
        command: Repository.createRef
        repo: owner/repo
        args: |
          {
            "ref": "refs/heads/featureA",
            "sha": "2650f145def9b02e7bcc370e3f15383a2e544ee7"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createRef).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.createRef', async () => {
      const input = mockConfigLoader(`
        command: Repository.createRef
        repo: owner/repo
        args: |
          ref: refs/heads/featureA
          sha: 2650f145def9b02e7bcc370e3f15383a2e544ee7
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createRef).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
