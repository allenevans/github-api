import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  getEmails: jest.fn(),

  getUser: (id: number) =>
    Promise.resolve({
      getEmails: mockGitHub.getEmails,
    }),
};

describe('User.getEmails', () => {
  beforeEach(() => {
    mockGitHub.getEmails.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getUser');
  });

  const mockArgs: any[] = [];

  describe('getUser', () => {
    it('should have getEmails method', () => {
      const api = new GitHub().getUser('super-user');

      expect(api.getEmails).toBeDefined();
    });
  });

  test('User.getEmails', async () => {
    const input = mockConfigLoader(`
        command: User.getEmails
        user: super-user
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getUser).toHaveBeenCalledWith('super-user');
    expect(mockGitHub.getEmails).toHaveBeenCalledWith(...mockArgs);
  });
});
