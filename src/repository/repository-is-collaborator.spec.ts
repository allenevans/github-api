import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  isCollaborator: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      isCollaborator: mockGitHub.isCollaborator,
    }),
};

describe('Repository.isCollaborator', () => {
  beforeEach(() => {
    mockGitHub.isCollaborator.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = ['username'];

  describe('getRepo', () => {
    it('should have isCollaborator method', () => {
      const api = new GitHub().getRepo();

      expect(api.isCollaborator).toBeDefined();
    });
  });

  test('Repository.isCollaborator', async () => {
    const input = mockConfigLoader(`
        command: Repository.isCollaborator
        repo: owner/repo
        args: username
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.isCollaborator).toHaveBeenCalledWith(...mockArgs);
  });
});
