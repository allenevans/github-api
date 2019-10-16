import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  forIssues: jest.fn(),

  search: () =>
    Promise.resolve({
      forIssues: mockGitHub.forIssues,
    }),
};

describe('Search.forIssues', () => {
  beforeEach(() => {
    mockGitHub.forIssues.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'search');
  });

  const mockArgs = [{
    q: 'repo:allenevans/github-api bug',
    sort: 'stars',
    order: 'desc',
  }];

  describe('search', () => {
    it('should have forIssues method', () => {
      const api = new GitHub().search();

      expect(api.forIssues).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Search.forIssues', async () => {
      const input = mockConfigLoader(`
        command: Search.forIssues
        args:
          {
            "q": "repo:allenevans/github-api bug",
            "sort": "stars",
            "order": "desc"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.search).toHaveBeenCalled();
      expect(mockGitHub.forIssues).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Search.forIssues', async () => {
      const input = mockConfigLoader(`
        command: Search.forIssues
        args:
          q: repo:allenevans/github-api bug
          sort: stars
          order: desc
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.search).toHaveBeenCalled();
      expect(mockGitHub.forIssues).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
