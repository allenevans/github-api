import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getBranch: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      getBranch: mockGitHub.getBranch,
    }),
};

describe('Repository.getBranch', () => {
  beforeEach(() => {
    mockGitHub.getBranch.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = ['master'];

  describe('getRepo', () => {
    it('should have getBranch method', () => {
      const api = new GitHub().getRepo();

      expect(api.getBranch).toBeDefined();
    });
  });

  test('Repository.getBranch', async () => {
    const input = mockConfigLoader(`
        command: Repository.getBranch
        repo: owner/repo
        args: master
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.getBranch).toHaveBeenCalledWith(...mockArgs);
  });
});
