import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  getTeams: jest.fn(),

  getOrganization: (organization: string) =>
    Promise.resolve({
      getTeams: mockGitHub.getTeams,
    }),
};

describe('Organization.getTeams', () => {
  beforeEach(() => {
    mockGitHub.getTeams.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getOrganization');
  });

  const mockArgs: any[] = [];

  describe('getOrganization', () => {
    it('should have getTeams method', () => {
      const api = new GitHub().getOrganization('my-org');

      expect(api.getTeams).toBeDefined();
    });
  });

  test('Organization.getTeams', async () => {
    const input = mockConfigLoader(`
        command: Organization.getTeams
        organization: my-org
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getOrganization).toHaveBeenCalledWith('my-org');
    expect(mockGitHub.getTeams).toHaveBeenCalledWith(...mockArgs);
  });
});
