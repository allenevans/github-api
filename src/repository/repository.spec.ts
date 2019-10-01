import repository from './repository';
import { ActionInput } from '../types/action-input';

describe('repository', () => {
  it('should throw an exception if repo is not defined', () =>
    expect(repository({})(<ActionInput>{})).rejects.toEqual(new Error('full repo name is required e.g. :owner/:repo')));

  it('should throw an exception if full repo name is not defined', () =>
    expect(repository({})(<ActionInput>{ repo: 'repo' })).rejects.toEqual(new Error('full repo name is required e.g. :owner/:repo')));
});
