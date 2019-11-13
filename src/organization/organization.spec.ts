import organization from './organization';
import { ActionInput } from '../types/action-input';

describe('organization', () => {
  it('should throw an exception if organization is not defined', () =>
    expect(organization({})(<ActionInput>{})).rejects.toEqual(new Error('organization is required')));
});
