import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  createLabel: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      createLabel: mockGitHub.createLabel,
    }),
};

describe('Issue.createLabel', () => {
  beforeEach(() => {
    mockGitHub.createLabel.mockImplementation(() =>
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
      name: 'good first issue',
      color: '009900',
      description: 'issue to get started with',
    },
  ];

  describe('getIssues', () => {
    it('should have createLabel method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.createLabel).toBeDefined();
    });
  });

  describe('json', () => {
    test('Issue.createLabel', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Issue.createLabel",
              "repo": "owner/repo",
              "args": [{
                "name": "good first issue",
                "color": "009900",
                "description": "issue to get started with"
              }]
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createLabel).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Issue.createLabel', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Issue.createLabel
            repo: owner/repo
            args:
              - name: good first issue
                color: 009900
                description: issue to get started with
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createLabel).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
