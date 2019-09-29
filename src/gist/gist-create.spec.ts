import gist from './gist';
import { mockConfigLoader } from '../utils/mock-config-loader';

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

  describe('json', () => {
    test('Gist.create', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Gist.create",
              "args": [
                {
                  "description": "Hello World Examples",
                  "public": false,
                  "files": {
                    "hello_world.js": {
                      "content": "config.log('hello world')"
                    }
                  }
                }
              ]
            }
      `);

      await gist(mockGitHub)(input);

      expect(mockGitHub.mockCreate).toHaveBeenCalledWith(mockGist);
    });
  });

  describe('yaml', () => {
    test('Gist.create', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Gist.create
            args:
              - description: Hello World Examples
                public: false
                files:
                  hello_world.js:
                    content: config.log('hello world')
      `);

      await gist(mockGitHub)(input);

      expect(mockGitHub.mockCreate).toHaveBeenCalledWith(mockGist);
    });
  });
});
