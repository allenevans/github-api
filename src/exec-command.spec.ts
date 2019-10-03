import { execCommand } from './exec-command';

describe('exec-command', () => {
  it('should await the api method call and apply the default select to the results', async () => {
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
        ignoreErrors: false,
        token: '',
        select: undefined,
      },
      selectDefaults: {},
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
        ignoreErrors: false,
        token: '',
        select: undefined,
      },
      selectDefaults: {},
    });

    expect(result).toEqual({
      data: true,
    });
  });

  it('should set the error flag in the returned result when an error is thrown', async () => {
    const fakeMethod = (input: string) => {
      const customError: any = new Error('it will never pass');

      customError.response = {
        data: {
          errors: ['always fail'],
        },
        status: 500,
      };

      return Promise.reject(customError);
    };

    const api = Promise.resolve({ fakeMethod });

    const result = await execCommand({
      api,
      input: {
        args: ['faked'],
        command: {
          apiClass: 'fakeApi',
          method: 'fakeMethod',
        },
        ignoreErrors: false,
        token: '',
        select: undefined,
      },
      selectDefaults: {},
    });

    expect(result).toEqual({
      data: {
        errors: ['always fail'],
      },
      error: true,
      status: 500,
    });
  });

  it('should handle standard exceptions', async () => {
    const standardException: any = new Error('it will never pass');

    const fakeMethod = () => {
      return Promise.reject(standardException);
    };

    const api = Promise.resolve({ fakeMethod });

    const result = await execCommand({
      api,
      input: {
        args: ['faked'],
        command: {
          apiClass: 'fakeApi',
          method: 'fakeMethod',
        },
        ignoreErrors: false,
        token: '',
        select: undefined,
      },
      selectDefaults: {},
    });

    expect(result).toEqual({
      data: {
        errors: [standardException],
      },
      error: true,
      headers: {},
      status: 500,
    });
  });
});
