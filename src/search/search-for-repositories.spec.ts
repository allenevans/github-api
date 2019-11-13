import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  forRepositories: jest.fn(),

  search: () =>
    Promise.resolve({
      forRepositories: mockGitHub.forRepositories,
    }),
};

describe('Search.forRepositories', () => {
  beforeEach(() => {
    mockGitHub.forRepositories.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'search');
  });

  const mockArgs = [{
    q: 'user:allenevans github-api',
    order: 'desc',
  }];

  describe('search', () => {
    it('should have forRepositories method', () => {
      const api = new GitHub().search();

      expect(api.forRepositories).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Search.forRepositories', async () => {
      const input = mockConfigLoader(`
        command: Search.forRepositories
        args:
          {
            "q": "user:allenevans github-api",
            "order": "desc"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.search).toHaveBeenCalled();
      expect(mockGitHub.forRepositories).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Search.forRepositories', async () => {
      const input = mockConfigLoader(`
        command: Search.forRepositories
        args:
          q: user:allenevans github-api
          order: desc
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.search).toHaveBeenCalled();
      expect(mockGitHub.forRepositories).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
