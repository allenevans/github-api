import GitHub from 'github-api';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { classMapping } from '../class-mapping';

const mockGitHub: any = {
  listOrgs: jest.fn(),

  getUser: (id: number) =>
    Promise.resolve({
      listOrgs: mockGitHub.listOrgs,
    }),
};

describe('User.listOrgs', () => {
  beforeEach(() => {
    mockGitHub.listOrgs.mockImplementation(() =>
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
    it('should have listOrgs method', () => {
      const api = new GitHub().getUser('super-user');

      expect(api.listOrgs).toBeDefined();
    });
  });

  test('User.listOrgs', async () => {
    const input = mockConfigLoader(`
        command: User.listOrgs
        user: super-user
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getUser).toHaveBeenCalledWith('super-user');
    expect(mockGitHub.listOrgs).toHaveBeenCalledWith(...mockArgs);
  });
});
