export const stringToBoolean = (input: string): boolean =>
  ['on', '1', 'yes', 'true'].includes(`${input}`.toLowerCase());
