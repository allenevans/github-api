import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  editIssue: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      editIssue: mockGitHub.editIssue,
    }),
};

describe('Issue.editIssue', () => {
  beforeEach(() => {
    mockGitHub.editIssue.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getIssues');
  });

  const mockArgs = [
    123456,
    {
      title: 'We have a problem',
      body: 'Found during test',
      assignees: ['bob'],
      milestone: 1,
      state: 'open',
      labels: ['bug'],
    },
  ];

  describe('getIssues', () => {
    it('should have editIssue method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.editIssue).toBeDefined();
    });
  });

  describe('json', () => {
    test('Issue.editIssue', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Issue.editIssue",
              "repo": "owner/repo",
              "args": [
                123456,
                {
                  "title": "We have a problem",
                  "body": "Found during test",
                  "assignees": [
                    "bob"
                  ],
                  "milestone": 1,
                  "state": "open",
                  "labels": [
                    "bug"
                  ]
                }
              ]
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.editIssue).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Issue.editIssue', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Issue.editIssue
            repo : owner/repo
            args:
              - 123456
              - title: We have a problem
                body: Found during test
                assignees:
                  - bob
                milestone: 1
                state: open
                labels:
                  - bug
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.editIssue).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
