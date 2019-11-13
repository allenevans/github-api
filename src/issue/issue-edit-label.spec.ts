import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
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

  describe('json arguments', () => {
    test('Issue.editLabel', async () => {
      const input = mockConfigLoader(`
        command: Issue.editLabel
        repo: owner/repo
        args: |
          [
            "good first issue",
            {
              "name": "easy issue",
              "color": "003300",
              "description": "issue to get started with"
            }
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.editLabel).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Issue.editLabel', async () => {
      const input = mockConfigLoader(`
        command: Issue.editLabel
        repo: owner/repo
        args: |
          - good first issue
          - name: easy issue
            color: '003300'
            description: issue to get started with
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.editLabel).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
