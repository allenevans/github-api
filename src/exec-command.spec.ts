import { execCommand } from './exec-command';

describe('exec-command', () => {
  it('should await the api method call and apply the default transform to the results', async () => {
    const fakeMethod = (input: string) =>
      Promise.resolve({
        data: {
          input,
        },
        status: 200,
      });
    const api = Promise.resolve({ fakeMethod });

    const result = await execCommand({
      api,
      input: {
        args: ['faked'],
        command: {
          apiClass: 'fakeApi',
          method: 'fakeMethod',
        },
        token: '',
        transform: undefined,
      },
      transformDefaults: {},
    });

    expect(result).toEqual({
      data: {
        input: 'faked',
      },
      status: 200,
    });
  });

  it('should handle boolean api responses', async () => {
    const fakeMethod = () => Promise.resolve(true);
    const api = Promise.resolve({ fakeMethod });

    const result = await execCommand({
      api,
      input: {
        args: [],
        command: {
          apiClass: 'fakeApi',
          method: 'fakeMethod',
        },
        token: '',
        transform: undefined,
      },
      transformDefaults: {},
    });

    expect(result).toEqual({
      data: true,
    });
  });
});
