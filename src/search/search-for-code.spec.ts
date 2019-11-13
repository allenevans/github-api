import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  forCode: jest.fn(),

  search: () =>
    Promise.resolve({
      forCode: mockGitHub.forCode,
    }),
};

describe('Search.forCode', () => {
  beforeEach(() => {
    mockGitHub.forCode.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'search');
  });

  const mockArgs = [{
    q: 'repo:allenevans/github-api github',
    order: 'desc',
  }];

  describe('search', () => {
    it('should have forCode method', () => {
      const api = new GitHub().search();

      expect(api.forCode).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Search.forCode', async () => {
      const input = mockConfigLoader(`
        command: Search.forCode
        args:
          {
            "q": "repo:allenevans/github-api github",
            "order": "desc"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.search).toHaveBeenCalled();
      expect(mockGitHub.forCode).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Search.forCode', async () => {
      const input = mockConfigLoader(`
        command: Search.forCode
        args:
          q: repo:allenevans/github-api github
          order: desc
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.search).toHaveBeenCalled();
      expect(mockGitHub.forCode).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
