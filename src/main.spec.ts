import * as core from '@actions/core';

jest.mock('@actions/core', () => ({
  getInput: jest.fn(),
  setFailed: jest.fn(),
}));

describe('github-api', () => {
  it('todo', () => {
    expect(core.getInput).toBeDefined();
  });
});
