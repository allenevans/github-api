import issue from './issue';
import { ActionInput } from '../types/action-input';

describe('issue', () => {
  it('should throw an exception if repo is not defined', () =>
    expect(issue({})(<ActionInput>{})).rejects.toEqual(new Error('full repo name is required e.g. :owner/:repo')));

  it('should throw an exception if full repo name is not defined', () =>
    expect(issue({})(<ActionInput>{ repo: 'repo' })).rejects.toEqual(new Error('full repo name is required e.g. :owner/:repo')));
});
