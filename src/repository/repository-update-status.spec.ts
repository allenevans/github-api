import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  updateStatus: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      updateStatus: mockGitHub.updateStatus,
    }),
};

describe('Repository.updateStatus', () => {
  beforeEach(() => {
    mockGitHub.updateStatus.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = [
    '2650f145def9b02e7bcc370e3f15383a2e544ee7',
    {
      state: 'failure',
      target_url: 'http://example.ci/job/123',
      description: 'Build job failed with exit code 1',
      context: 'continuous-integration',
    },
  ];

  describe('getRepo', () => {
    it('should have updateStatus method', () => {
      const api = new GitHub().getRepo();

      expect(api.updateStatus).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.updateStatus', async () => {
      const input = mockConfigLoader(`
        command: Repository.updateStatus
        repo: owner/repo
        args: |
          [
            "2650f145def9b02e7bcc370e3f15383a2e544ee7",
            {
              "state": "failure",
              "target_url": "http://example.ci/job/123",
              "description": "Build job failed with exit code 1",
              "context": "continuous-integration"
            }
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.updateStatus).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.updateStatus', async () => {
      const input = mockConfigLoader(`
        command: Repository.updateStatus
        repo: owner/repo
        args: |
          - 2650f145def9b02e7bcc370e3f15383a2e544ee7
          - state: failure
            target_url: http://example.ci/job/123
            description: Build job failed with exit code 1
            context: continuous-integration
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.updateStatus).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
