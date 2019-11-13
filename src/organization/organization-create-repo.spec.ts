import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  createRepo: jest.fn(),

  getOrganization: (organization: string) =>
    Promise.resolve({
      createRepo: mockGitHub.createRepo,
    }),
};

describe('Organization.createRepo', () => {
  beforeEach(() => {
    mockGitHub.createRepo.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getOrganization');
  });

  const mockArgs: any[] = [
    {
      name: 'test-repo',
      description: 'Repo for testing github api',
      homepage: 'https://github.com',
      private: false,
      has_issues: true,
      has_projects: true,
      has_wiki: true,
    },
  ];

  describe('getOrganization', () => {
    it('should have createRepo method', () => {
      const api = new GitHub().getOrganization('my-org');

      expect(api.createRepo).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Organization.createRepo', async () => {
      const input = mockConfigLoader(`
        command: Organization.createRepo
        organization: my-org
        args: |
          {
            "name": "test-repo",
            "description": "Repo for testing github api",
            "homepage": "https://github.com",
            "private": false,
            "has_issues": true,
            "has_projects": true,
            "has_wiki": true
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getOrganization).toHaveBeenCalledWith('my-org');
      expect(mockGitHub.createRepo).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Organization.createRepo', async () => {
      const input = mockConfigLoader(`
        command: Organization.createRepo
        organization: my-org
        args:
          name: 'test-repo'
          description: Repo for testing github api
          homepage: 'https://github.com'
          private: false
          has_issues: true
          has_projects: true
          has_wiki: true
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getOrganization).toHaveBeenCalledWith('my-org');
      expect(mockGitHub.createRepo).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
