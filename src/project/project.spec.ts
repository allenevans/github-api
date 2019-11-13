import project from './project';
import { ActionInput } from '../types/action-input';

describe('project', () => {
  it('should throw an exception if repo is not defined', () =>
    expect(project('12345')(<ActionInput>{})).rejects.toEqual(new Error('id is required')));
});
