import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getRef: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      getRef: mockGitHub.getRef,
    }),
};

describe('Repository.getRef', () => {
  beforeEach(() => {
    mockGitHub.getRef.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = ['ref/heads/master'];

  describe('getRepo', () => {
    it('should have getRef method', () => {
      const api = new GitHub().getRepo();

      expect(api.getRef).toBeDefined();
    });
  });

  test('Repository.getRef', async () => {
    const input = mockConfigLoader(`
        command: Repository.getRef
        repo: owner/repo
        args: ref/heads/master
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.getRef).toHaveBeenCalledWith(...mockArgs);
  });
});
