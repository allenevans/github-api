import { stringToBoolean } from './boolean-utils';

describe('boolean-utils', () => {
  describe('stringToBoolean', () => {
    it('should parse to `true`', () => {
      expect(stringToBoolean('true')).toBe(true);
      expect(stringToBoolean('yes')).toBe(true);
      expect(stringToBoolean('1')).toBe(true);
      expect(stringToBoolean('on')).toBe(true);
    });

    it('should parse to `false`', () => {
      expect(stringToBoolean('false')).toBe(false);
      expect(stringToBoolean('no')).toBe(false);
      expect(stringToBoolean('0')).toBe(false);
      expect(stringToBoolean('off')).toBe(false);
      expect(stringToBoolean('')).toBe(false);
      expect(stringToBoolean('random')).toBe(false);
    });
  });
});
