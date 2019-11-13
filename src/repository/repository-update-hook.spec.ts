import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  updateHook: jest.fn(),

  getRepo: (owner?: string, repo?: string) =>
    Promise.resolve({
      updateHook: mockGitHub.updateHook,
    }),
};

describe('Repository.updateHook', () => {
  beforeEach(() => {
    mockGitHub.updateHook.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getRepo');
  });

  const mockArgs = [
    123456,
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
    it('should have updateHook method', () => {
      const api = new GitHub().getRepo();

      expect(api.updateHook).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Repository.updateHook', async () => {
      const input = mockConfigLoader(`
        command: Repository.updateHook
        repo: owner/repo
        args: |
          [
            123456,
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
          ]
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getRepo).toHaveBeenCalledWith('owner', 'repo');
      expect(mockGitHub.updateHook).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Repository.updateHook', async () => {
      const input = mockConfigLoader(`
        command: Repository.updateHook
        repo: owner/repo
        args: |
          - 123456
          - name: web
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
      expect(mockGitHub.updateHook).toHaveBeenCalledWith(...mockArgs);
    });
  });
});
