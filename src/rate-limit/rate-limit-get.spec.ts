import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  mockGetRateLimit: jest.fn(),

  getRateLimit: () =>
    Promise.resolve({
      getRateLimit: mockGitHub.mockGetRateLimit,
    }),
};

describe('RateLimit.getRateLimit', () => {
  beforeEach(() => {
    mockGitHub.mockGetRateLimit.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRateLimit');
  });

  const mockArgs: any[] = [];

  describe('getRateLimit', () => {
    it('should have getRateLimit method', () => {
      const api = new GitHub().getRateLimit();

      expect(api.getRateLimit).toBeDefined();
    });
  });

  test('RateLimit.getRateLimit', async () => {
    const input = mockConfigLoader(`
        command: RateLimit.getRateLimit
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getRateLimit).toHaveBeenCalledWith();
    expect(mockGitHub.mockGetRateLimit).toHaveBeenCalledWith(...mockArgs);
  });
});
