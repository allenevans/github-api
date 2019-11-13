import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  forkToOrg: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      forkToOrg: mockGitHub.forkToOrg,
    }),
};

describe('Repository.forkToOrg', () => {
  beforeEach(() => {
    mockGitHub.forkToOrg.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = ['organization'];

  describe('getRepo', () => {
    it('should have forkToOrg method', () => {
      const api = new GitHub().getRepo();

      expect(api.forkToOrg).toBeDefined();
    });
  });

  test('Repository.forkToOrg', async () => {
    const input = mockConfigLoader(`
        command: Repository.forkToOrg
        repo: owner/repo
        args: organization
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.forkToOrg).toHaveBeenCalledWith(...mockArgs);
  });
});
