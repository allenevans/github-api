import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  getRepos: jest.fn(),

  getOrganization: (organization: string) =>
    Promise.resolve({
      getRepos: mockGitHub.getRepos,
    }),
};

describe('Organization.getRepos', () => {
  beforeEach(() => {
    mockGitHub.getRepos.mockImplementation(() =>
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
    it('should have getRepos method', () => {
      const api = new GitHub().getOrganization('my-org');

      expect(api.getRepos).toBeDefined();
    });
  });

  test('Organization.getRepos', async () => {
    const input = mockConfigLoader(`
        command: Organization.getRepos
        organization: my-org
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getOrganization).toHaveBeenCalledWith('my-org');
    expect(mockGitHub.getRepos).toHaveBeenCalledWith(...mockArgs);
  });
});
