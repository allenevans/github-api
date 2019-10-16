import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  isManagedRepo: jest.fn(),

  getTeam: (id: number) =>
    Promise.resolve({
      isManagedRepo: mockGitHub.isManagedRepo,
    }),
};

describe('Team.isManagedRepo', () => {
  beforeEach(() => {
    mockGitHub.isManagedRepo.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getTeam');
  });

  const mockArgs: any[] = ['example-corp', 'test-repo'];

  describe('getTeam', () => {
    it('should have isManagedRepo method', () => {
      const api = new GitHub().getTeam(123456);

      expect(api.isManagedRepo).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Team.isManagedRepo', async () => {
      const input = mockConfigLoader(`
        command: Team.isManagedRepo
        id: 123456
        args: |
          [
            "example-corp",
            "test-repo"
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getTeam).toHaveBeenCalledWith(123456);
      expect(mockGitHub.isManagedRepo).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Team.isManagedRepo', async () => {
      const input = mockConfigLoader(`
        command: Team.isManagedRepo
        id: 123456
        args: |
          - example-corp
          - test-repo
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getTeam).toHaveBeenCalledWith(123456);
      expect(mockGitHub.isManagedRepo).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
