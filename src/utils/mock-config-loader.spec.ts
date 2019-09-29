import { mockConfigLoader } from './mock-config-loader';
import { ActionInput } from '../types/action-input';
import { ActionCommand } from '../types/action-command';

describe('mock config loader', () => {
  it('should parse json config from input', () => {
    const input = mockConfigLoader(`
        with:
          json: |
            {
              "command": "json.method",
              "args": [
                "argument"
              ],
              "transform": "."
            }
      `);

    expect(input).toEqual(<ActionInput>{
      args: ['argument'],
      command: {
        apiClass: 'json',
        method: 'method',
      },
      transform: '.',
    });
  });

  it('should parse yaml config from input', () => {
    const input = mockConfigLoader(`
        with:
          yaml: |
            command: yaml.method
            args:
              - argument
            transform: .
      `);

    expect(input).toEqual(<ActionInput>{
      args: ['argument'],
      command: {
        apiClass: 'yaml',
        method: 'method',
      },
      transform: '.',
    });
  });

  it('should throw an error if `json` or `yaml` have not been specified', () => {
    expect(() =>
      mockConfigLoader(`
        with:
          other:
      `),
    ).toThrowError('Missing `yaml` or `json` input');
  });
});
