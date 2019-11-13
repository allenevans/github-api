import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  listRepos: jest.fn(),

  getTeam: (id: number) =>
    Promise.resolve({
      listRepos: mockGitHub.listRepos,
    }),
};

describe('Team.listRepos', () => {
  beforeEach(() => {
    mockGitHub.listRepos.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getTeam');
  });

  const mockArgs: any[] = [];

  describe('getTeam', () => {
    it('should have listRepos method', () => {
      const api = new GitHub().getTeam(123456);

      expect(api.listRepos).toBeDefined();
    });
  });

  test('Team.listRepos', async () => {
    const input = mockConfigLoader(`
        command: Team.listRepos
        id: 123456
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getTeam).toHaveBeenCalledWith(123456);
    expect(mockGitHub.listRepos).toHaveBeenCalledWith(...mockArgs);
  });
});
