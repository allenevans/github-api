import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  createMilestone: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      createMilestone: mockGitHub.createMilestone,
    }),
};

describe('Issue.createMilestone', () => {
  beforeEach(() => {
    mockGitHub.createMilestone.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getIssues');
  });

  const mockArgs = [
    {
      title: 'v1.0.0',
      state: 'open',
      description: 'Version 1.0.0',
      due_on: '2020-01-01T00:00:00Z',
    },
  ];

  describe('getIssues', () => {
    it('should have createMilestone method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.createMilestone).toBeDefined();
    });
  });

  describe('json', () => {
    test('Issue.createMilestone', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Issue.createMilestone",
              "repo": "owner/repo",
              "args": [{
                "title": "v1.0.0",
                "state": "open",
                "description": "Version 1.0.0",
                "due_on": "2020-01-01T00:00:00Z"
              }]
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createMilestone).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Issue.createMilestone', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Issue.createMilestone
            repo: owner/repo
            args:
              - title: v1.0.0
                state: open
                description: Version 1.0.0
                due_on: '2020-01-01T00:00:00Z'
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createMilestone).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
