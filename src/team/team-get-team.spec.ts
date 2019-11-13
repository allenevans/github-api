import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  mockGetTeam: jest.fn(),

  getTeam: (id: number) =>
    Promise.resolve({
      getTeam: mockGitHub.mockGetTeam,
    }),
};

describe('Team.getTeam', () => {
  beforeEach(() => {
    mockGitHub.mockGetTeam.mockImplementation(() =>
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
    it('should have getTeams method', () => {
      const api = new GitHub().getTeam(123456);

      expect(api.getTeam).toBeDefined();
    });
  });

  test('Team.getTeam', async () => {
    const input = mockConfigLoader(`
        command: Team.getTeam
        id: 123456
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getTeam).toHaveBeenCalledWith(123456);
    expect(mockGitHub.mockGetTeam).toHaveBeenCalledWith(...mockArgs);
  });
});
