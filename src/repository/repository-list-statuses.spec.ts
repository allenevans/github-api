import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listStatuses: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      listStatuses: mockGitHub.listStatuses,
    }),
};

describe('Repository.listStatuses', () => {
  beforeEach(() => {
    mockGitHub.listStatuses.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = ['8938657f5782ab7ca951d7ac115743c8259e12d3'];

  describe('getRepo', () => {
    it('should have listStatuses method', () => {
      const api = new GitHub().getRepo();

      expect(api.listStatuses).toBeDefined();
    });
  });

  test('Repository.listStatuses', async () => {
    const input = mockConfigLoader(`
        command: Repository.listStatuses
        repo: owner/repo
        args: 8938657f5782ab7ca951d7ac115743c8259e12d3
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.listStatuses).toHaveBeenCalledWith(...mockArgs);
  });
});
