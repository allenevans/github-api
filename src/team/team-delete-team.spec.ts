import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  deleteTeam: jest.fn(),

  getTeam: (id: number) =>
    Promise.resolve({
      deleteTeam: mockGitHub.deleteTeam,
    }),
};

describe('Team.deleteTeam', () => {
  beforeEach(() => {
    mockGitHub.deleteTeam.mockImplementation(() =>
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
    it('should have deleteTeam method', () => {
      const api = new GitHub().getTeam(123456);

      expect(api.deleteTeam).toBeDefined();
    });
  });

  test('Team.deleteTeam', async () => {
    const input = mockConfigLoader(`
        command: Team.deleteTeam
        id: 123456
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getTeam).toHaveBeenCalledWith(123456);
    expect(mockGitHub.deleteTeam).toHaveBeenCalledWith(...mockArgs);
  });
});
