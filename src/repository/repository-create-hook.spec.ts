import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  createHook: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      createHook: mockGitHub.createHook,
    }),
};

describe('Repository.createHook', () => {
  beforeEach(() => {
    mockGitHub.createHook.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = [
    {
      name: 'web',
      active: true,
      events: ['push', 'pull_request'],
      config: {
        url: 'https://example.com/webhook',
        content_type: 'json',
        insecure_ssl: '0',
      },
    },
  ];

  describe('getRepo', () => {
    it('should have createHook method', () => {
      const api = new GitHub().getRepo();

      expect(api.createHook).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.createHook', async () => {
      const input = mockConfigLoader(`
        command: Repository.createHook
        repo: owner/repo
        args: |
          {
            "name": "web",
            "active": true,
            "events": [
              "push",
              "pull_request"
            ],
            "config": {
              "url": "https://example.com/webhook",
              "content_type": "json",
              "insecure_ssl": "0"
            }
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createHook).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.createHook', async () => {
      const input = mockConfigLoader(`
        command: Repository.createHook
        repo: owner/repo
        args: |
          name: web
          active: true
          events:
            - push
            - pull_request
          config:
            url: https://example.com/webhook
            content_type: json
            insecure_ssl: '0'
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.createHook).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
