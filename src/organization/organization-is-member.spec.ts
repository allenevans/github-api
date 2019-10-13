import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  isMember: jest.fn(),

  getOrganization: (organization: string) =>
    Promise.resolve({
      isMember: mockGitHub.isMember,
    }),
};

describe('Organization.isMember', () => {
  beforeEach(() => {
    mockGitHub.isMember.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getOrganization');
  });

  const mockArgs: any[] = ['username'];

  describe('getOrganization', () => {
    it('should have isMember method', () => {
      const api = new GitHub().getOrganization('my-org');

      expect(api.isMember).toBeDefined();
    });
  });

  test('Organization.isMember', async () => {
    const input = mockConfigLoader(`
        command: Organization.isMember
        organization: my-org
        args: username
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getOrganization).toHaveBeenCalledWith('my-org');
    expect(mockGitHub.isMember).toHaveBeenCalledWith(...mockArgs);
  });
});
