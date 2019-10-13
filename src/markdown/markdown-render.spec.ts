import GitHub from 'github-api';
import { classMapping } from '../class-mapping';
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

  describe('json arguments', () => {
    test('Markdown.render', async () => {
      const input = mockConfigLoader(`
        command: Markdown.render
        args:
          {
            "mode": "markdown",
            "text": "# Markdown"
          }
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getMarkdown).toHaveBeenCalled();
      expect(mockGitHub.render).toHaveBeenCalledWith(mockArgs);
    });
  });

  describe('yaml arguments', () => {
    test('Markdown.render', async () => {
      const input = mockConfigLoader(`
        command: Markdown.render
        args:
          mode: markdown
          text: '# Markdown'
      `);

      await classMapping[input.command.apiClass](mockGitHub)(input);

      expect(mockGitHub.getMarkdown).toHaveBeenCalled();
      expect(mockGitHub.render).toHaveBeenCalledWith(mockArgs);
    });
  });
});
