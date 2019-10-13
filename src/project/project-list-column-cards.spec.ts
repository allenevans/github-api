import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  listColumnCards: jest.fn(),

  getProject: (id: string) =>
    Promise.resolve({
      listColumnCards: mockGitHub.listColumnCards,
    }),
};

describe('Project.listColumnCards', () => {
  beforeEach(() => {
    mockGitHub.listColumnCards.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getProject');
  });

  const mockArgs: any[] = [123456];

  describe('getProject', () => {
    it('should have listColumnCards method', () => {
      const api = new GitHub().getProject('123456');

      expect(api.listColumnCards).toBeDefined();
    });
  });

  test('Project.listColumnCards', async () => {
    const input = mockConfigLoader(`
        command: Project.listColumnCards
        id: 123456
        args: 123456
      `);

    await classMapping[input.command.apiClass](mockGitHub)(input);

    expect(mockGitHub.getProject).toHaveBeenCalledWith(123456);
    expect(mockGitHub.listColumnCards).toHaveBeenCalledWith(...mockArgs);
  });
});
