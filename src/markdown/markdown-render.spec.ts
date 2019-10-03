import GitHub from 'github-api';
import markdown from './markdown';
import { mockConfigLoader } from '../utils/mock-config-loader';

const mockGitHub: any = {
  render: jest.fn(),

  getMarkdown: () =>
    Promise.resolve({
      render: mockGitHub.render,
    }),
};

describe('Markdown.render', () => {
  beforeEach(() => {
    mockGitHub.render.mockImplementation(() =>
      Promise.resolve({
        data: {},
        headers: {},
        status: 0,
      }),
    );

    jest.spyOn(mockGitHub, 'getMarkdown');
  });

  const mockArgs = {
    mode: 'markdown',
    text: '# Markdown',
  };

  describe('getMarkdown', () => {
    it('should have render method', () => {
      const api = new GitHub().getMarkdown();

      expect(api.render).toBeDefined();
    });
  });

  describe('json', () => {
    test('Markdown.render', async () => {
      const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "Markdown.render",
              "args": [{
                "mode": "markdown",
                "text": "# Markdown"
              }]
            }
      `);

      await markdown(mockGitHub)(input);

      expect(mockGitHub.getMarkdown).toHaveBeenCalled();
      expect(mockGitHub.render).toHaveBeenCalledWith(mockArgs);
    });
  });

  describe('yaml', () => {
    test('Markdown.render', async () => {
      const input = mockConfigLoader(`
        with:
          yaml: |
            command: Markdown.render
            args:
              - mode: markdown
                text: '# Markdown'
      `);

      await markdown(mockGitHub)(input);

      expect(mockGitHub.getMarkdown).toHaveBeenCalled();
      expect(mockGitHub.render).toHaveBeenCalledWith(mockArgs);
    });
  });
});
