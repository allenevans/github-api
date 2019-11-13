import { mockConfigLoader } from './mock-config-loader';
import { ActionInput } from '../types/action-input';

describe('mock config loader', () => {
  it('should parse config from input with json args', () => {
    const input = mockConfigLoader(`
        command: json.method
        args: |
          [
            "argument1",
            "argument2"
          ]
        select: '.'
      `);

    expect(input).toEqual(<ActionInput>{
      args: ['argument1', 'argument2'],
      command: {
        apiClass: 'json',
        method: 'method',
      },
      ignoreErrors: false,
      select: '.',
      token: '',
    });
  });

  it('should parse yaml config from input', () => {
    const input = mockConfigLoader(`
        command: yaml.method
        args: |
          - argument
        select: .
      `);

    expect(input).toEqual(<ActionInput>{
      args: ['argument'],
      command: {
        apiClass: 'yaml',
        method: 'method',
      },
      ignoreErrors: false,
      select: '.',
      token: '',
    });
  });
});
