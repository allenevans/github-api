import team from './team';
import { ActionInput } from '../types/action-input';

describe('team', () => {
  it('should throw an exception if id for team is not defined', () =>
    expect(team({})(<ActionInput>{})).rejects.toEqual(new Error('id for team is required')));
});
