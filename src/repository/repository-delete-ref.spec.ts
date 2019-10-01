import GitHub from 'github-api';
import repository from './repository';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  mockDeleteRef: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      deleteRef: mockGitHub.mockDeleteRef,
    }),
};

describe('Repository.deleteRef', () => {
  beforeEach(() => {
    mockGitHub.mockDeleteRef.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = 'heads/my-branch';

  describe('getRepo', () => {
    it('should have deleteRef method', () => {
      const api = new GitHub().getRepo();

      expect(api.deleteRef).toBeDefined();
    });
  });

  describe('json', () => {
    test('Repository.deleteRef', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Repository.deleteRef",
              "repo": "owner/repo",
              "args": [
                "heads/my-branch"
              ]
            }
      `);

      await repository(mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.mockDeleteRef).toHaveBeenCalledWith(mockArgs);
    });
  });

  describe('yaml', () => {
    test('Repository.deleteRef', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Repository.deleteRef
            repo: owner/repo
            args:
              - heads/my-branch
      `);

      await repository(mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.mockDeleteRef).toHaveBeenCalledWith(mockArgs);
    });
  });
});
