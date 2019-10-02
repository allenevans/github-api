import GitHub from 'github-api';
import repository from './issue';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  editLabel: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      editLabel: mockGitHub.editLabel,
    }),
};

describe('Issue.editLabel', () => {
  beforeEach(() => {
    mockGitHub.editLabel.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getIssues');
  });

  const mockArgs = [
    'good first issue',
    {
      name: 'easy issue',
      color: '003300',
      description: 'issue to get started with',
    },
  ];

  describe('getIssues', () => {
    it('should have editLabel method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.editLabel).toBeDefined();
    });
  });

  describe('json', () => {
    test('Issue.editLabel', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Issue.editLabel",
              "repo": "owner/repo",
              "args": [
                "good first issue",
                {
                  "name": "easy issue",
                  "color": "003300",
                  "description": "issue to get started with"
                }
              ]
            }
      `);

      await repository(mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.editLabel).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Issue.editLabel', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Issue.editLabel
            repo: owner/repo
            args:
              - good first issue
              - name: easy issue
                color: '003300'
                description: issue to get started with
      `);

      await repository(mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.editLabel).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
