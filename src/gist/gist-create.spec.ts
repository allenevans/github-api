import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
import { mockConfigLoader } from '../utils/mock-config-loader';
import { inputParse } from '../utils/input-parse';

const mockGitHub = {
  mockCreate: jest.fn(),

  getGist: () =>
    Promise.resolve({
      create: mockGitHub.mockCreate,
    }),
};

describe('Gist.create', () => {
  beforeEach(() => {
    mockGitHub.mockCreate.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );
  });

  const mockGist = {
    description: 'Hello World Examples',
    public: false,
    files: {
      'hello_world.js': {
        content: "config.log('hello world')",
      },
    },
  };

  describe('getGist', () => {
    it('should have create method', () => {
      const api = new GitHub().getGist();

      expect(api.create).toBeDefined();
    });
  });

  describe('json arguments', () => {
    test('Gist.create', async () => {
      const input = mockConfigLoader(`
        command: Gist.create
        args: |
          {
            "description": "Hello World Examples",
            "public": false,
            "files": {
              "hello_world.js": {
                "content": "config.log('hello world')"
              }
            }
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.mockCreate).toHaveBeenCalledWith(mockGist);
    });
  });

  describe('yaml arguments', () => {
    test('Gist.create', async () => {
      const input = mockConfigLoader(`
        command: Gist.create
        args: |
          description: Hello World Examples
          public: false
          files:
            hello_world.js:
              content: config.log('hello world')
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.mockCreate).toHaveBeenCalledWith(mockGist);
    });
  });
});
