import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  listMembers: jest.fn(),

  getTeam: (id: number) =>
    Promise.resolve({
      listMembers: mockGitHub.listMembers,
    }),
};

describe('Team.listMembers', () => {
  beforeEach(() => {
    mockGitHub.listMembers.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getTeam');
  });

  const mockArgs: any[] = [{
    role: 'all',
  }];

  describe('getTeam', () => {
    it('should have listMembers method', () => {
      const api = new GitHub().getTeam(123456);

      expect(api.listMembers).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Team.listMembers', async () => {
      const input = mockConfigLoader(`
        command: Team.listMembers
        id: 123456
        args: |
          {
            "role": "all"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getTeam).toHaveBeenCalledWith(123456);
      expect(mockGitHub.listMembers).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Team.listMembers', async () => {
      const input = mockConfigLoader(`
        command: Team.listMembers
        id: 123456
        args: |
          role: all
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getTeam).toHaveBeenCalledWith(123456);
      expect(mockGitHub.listMembers).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
