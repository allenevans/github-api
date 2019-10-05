import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  mockGetRevision: jest.fn(),

  getGist: (id?: string) =>
    Promise.resolve({
      getRevision: mockGitHub.mockGetRevision,
    }),
};

describe('Gist.getRevision', () => {
  beforeEach(() => {
    mockGitHub.mockGetRevision.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getGist');
  });

  const mockArgs = ['87bda301776cac4405000000880755454c200000'];

  describe('getGist', () => {
    it('should have getRevision method', () => {
      const api = new GitHub().getGist();

      expect(api.getRevision).toBeDefined();
    });
  });

  describe('json', () => {
    test('Gist.getRevision', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Gist.getRevision",
              "id": "eb07a99bc427a3d3ce899d305f960000",
              "args": [
                "87bda301776cac4405000000880755454c200000"
              ]
            }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
      expect(mockGitHub.mockGetRevision).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml', () => {
    test('Gist.getRevision', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Gist.getRevision
            id: eb07a99bc427a3d3ce899d305f960000
            args:
              - 87bda301776cac4405000000880755454c200000
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
      expect(mockGitHub.mockGetRevision).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
