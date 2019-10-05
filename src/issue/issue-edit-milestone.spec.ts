import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  editMilestone: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      editMilestone: mockGitHub.editMilestone,
    }),
};

describe('Issue.editMilestone', () => {
  beforeEach(() => {
    mockGitHub.editMilestone.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getIssues');
  });

  const mockArgs = [
    '1',
    {
      title: 'v1.0.0',
      state: 'open',
      description: 'Version 1.0.0',
      due_on: '2021-01-01T00:00:00Z',
    },
  ];

  describe('getIssues', () => {
    it('should have editMilestone method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.editMilestone).toBeDefined();
    });
  });

  describe('json', () => {
    test('Issue.editMilestone', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Issue.editMilestone",
              "repo": "owner/repo",
              "args": [
                "1",
                {
                  "title": "v1.0.0",
                  "state": "open",
                  "description": "Version 1.0.0",
                  "due_on": "2021-01-01T00:00:00Z"
                }
              ]
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.editMilestone).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Issue.editMilestone', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Issue.editMilestone
            repo: owner/repo
            args:
              - '1'
              - title: v1.0.0
                state: open
                description: Version 1.0.0
                due_on: '2021-01-01T00:00:00Z'
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.editMilestone).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
