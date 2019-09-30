import GitHub from 'github-api';
import gist from './gist';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  mockUpdate: jest.fn(),

  getGist: (id?: string) =>
    Promise.resolve({
      update: mockGitHub.mockUpdate,
    }),
};

describe('Gist.update', () => {
  beforeEach(() => {
    mockGitHub.mockUpdate.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getGist');
  });

  const mockGist = {
    description: 'Hello World Examples Updated',
    public: false,
    files: {
      'hello_world.js': {
        content: "config.log('hello world');",
      },
    },
  };

  describe('getGist', () => {
    it('should have update method', () => {
      const api = new GitHub().getGist();

      expect(api.update).toBeDefined();
    });
  });

  describe('json', () => {
    test('Gist.update', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Gist.update",
              "id": "eb07a99bc427a3d3ce899d305f960000",
              "args": [
                {
                  "description": "Hello World Examples Updated",
                  "public": false,
                  "files": {
                    "hello_world.js": {
                      "content": "config.log('hello world');"
                    }
                  }
                }
              ]
            }
      `);

      await gist(mockGitHub)(input);

      expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
      expect(mockGitHub.mockUpdate).toHaveBeenCalledWith(mockGist);
    });
  });

  describe('yaml', () => {
    test('Gist.update', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Gist.update
            id: eb07a99bc427a3d3ce899d305f960000
            args:
              - description: Hello World Examples Updated
                public: false
                files:
                  hello_world.js:
                    content: config.log('hello world');
      `);

      await gist(mockGitHub)(input);

      expect(mockGitHub.getGist).toHaveBeenCalledWith('eb07a99bc427a3d3ce899d305f960000');
      expect(mockGitHub.mockUpdate).toHaveBeenCalledWith(mockGist);
    });
  });
});