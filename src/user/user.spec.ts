import user from './user';
import { ActionInput } from '../types/action-input';

describe('user', () => {
  it('should throw an exception if user is not defined', () =>
    expect(user({})(<ActionInput>{})).rejects.toEqual(new Error('user is required')));
});
