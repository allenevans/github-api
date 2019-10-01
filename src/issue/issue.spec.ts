import issue from './issue';
import { ActionInput } from '../types/action-input';

describe('issue', () => {
  it('should throw an exception if id is not defined', () =>
    expect(issue({})(<ActionInput>{})).rejects.toEqual(new Error('id is required')));
});
