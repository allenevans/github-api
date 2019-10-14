import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  getDetails: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      getDetails: mockGitHub.getDetails,
    }),
};

describe('Repository.getDetails', () => {
  beforeEach(() => {
    mockGitHub.getDetails.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs: any[] = [];

  describe('getRepo', () => {
    it('should have getDetails method', () => {
      const api = new GitHub().getRepo();

      expect(api.getDetails).toBeDefined();
    });
  });

  test('Repository.getDetails', async () => {
    const input = mockConfigLoader(`
        command: Repository.getDetails
        repo: owner/repo
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
    expect(mockGitHub.getDetails).toHaveBeenCalledWith(...mockArgs);
  });
});
