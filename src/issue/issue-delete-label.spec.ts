import GitHub from 'github-api';
import repository from './issue';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  deleteLabel: jest.fn(),

  getIssues: (user: string, repo: string) =>
    Promise.resolve({
      deleteLabel: mockGitHub.deleteLabel,
    }),
};

describe('Issue.deleteLabel', () => {
  beforeEach(() => {
    mockGitHub.deleteLabel.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getIssues');
  });

  const mockArgs = ['good first issue'];

  describe('getIssues', () => {
    it('should have deleteLabel method', () => {
      const api = new GitHub().getIssues('user', 'repo');

      expect(api.deleteLabel).toBeDefined();
    });
  });

  describe('json', () => {
    test('Issue.deleteLabel', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Issue.deleteLabel",
              "id": "user/repo",
              "args": ["good first issue"]
            }
      `);

      await repository(mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('user', 'repo');
      expect(mockGitHub.deleteLabel).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Issue.deleteLabel', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Issue.deleteLabel
            id: user/repo
            args:
              - good first issue
      `);

      await repository(mockGitHub)(input);

      expect(mockGitHub.getIssues).toHaveBeenCalledWith('user', 'repo');
      expect(mockGitHub.deleteLabel).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
