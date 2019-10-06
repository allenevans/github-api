import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  listMembers: jest.fn(),

  getOrganization: (organization: string) =>
    Promise.resolve({
      listMembers: mockGitHub.listMembers,
    }),
};

describe('Organization.listMembers', () => {
  beforeEach(() => {
    mockGitHub.listMembers.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getOrganization');
  });

  const mockArgs: any[] = ['all', 'all'];

  describe('getOrganization', () => {
    it('should have listMembers method', () => {
      const api = new GitHub().getOrganization('my-org');

      expect(api.listMembers).toBeDefined();
    });
  });

  describe('json', () => {
    test('Organization.listMembers', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Organization.listMembers",
              "organization": "my-org",
              "args": [
                "all",
                "all"
              ]
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getOrganization).toHaveBeenCalledWith('my-org');
      expect(mockGitHub.listMembers).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Organization.listMembers', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Organization.listMembers
            organization: my-org
            args:
              - all
              - all
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getOrganization).toHaveBeenCalledWith('my-org');
      expect(mockGitHub.listMembers).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
