import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  updateHead: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      updateHead: mockGitHub.updateHead,
    }),
};

describe('Repository.updateHead', () => {
  beforeEach(() => {
    mockGitHub.updateHead.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = [
    'tags/v1.0.0',
    '8938657f5782ab7ca951d7ac115743c8259e12d3',
    false,
  ];

  describe('getRepo', () => {
    it('should have updateHead method', () => {
      const api = new GitHub().getRepo();

      expect(api.updateHead).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.updateHead', async () => {
      const input = mockConfigLoader(`
        command: Repository.updateHead
        repo: owner/repo
        args: |
          [
            "tags/v1.0.0",
            "8938657f5782ab7ca951d7ac115743c8259e12d3",
            false
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.updateHead).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.updateHead', async () => {
      const input = mockConfigLoader(`
        command: Repository.updateHead
        repo: owner/repo
        args: |
          - tags/v1.0.0
          - 8938657f5782ab7ca951d7ac115743c8259e12d3
          - false
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.updateHead).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
