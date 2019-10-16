import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  forUsers: jest.fn(),

  search: () =>
    Promise.resolve({
      forUsers: mockGitHub.forUsers,
    }),
};

describe('Search.forUsers', () => {
  beforeEach(() => {
    mockGitHub.forUsers.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'search');
  });

  const mockArgs = [{
    q: 'allenevans',
    sort: 'followers',
    order: 'desc',
  }];

  describe('search', () => {
    it('should have forUsers method', () => {
      const api = new GitHub().search();

      expect(api.forUsers).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Search.forUsers', async () => {
      const input = mockConfigLoader(`
        command: Search.forUsers
        args:
          {
            "q": "allenevans",
            "sort": "followers",
            "order": "desc"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.search).toHaveBeenCalled();
      expect(mockGitHub.forUsers).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Search.forUsers', async () => {
      const input = mockConfigLoader(`
        command: Search.forUsers
        sort: followers
        args:
          q: allenevans
          sort: followers
          order: desc
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.search).toHaveBeenCalled();
      expect(mockGitHub.forUsers).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
