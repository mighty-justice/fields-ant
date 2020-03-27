import { getFieldSuffix } from '../../src/utilities';

const TYPE_INFERENCES = [
  ['case.status.is_loading', 'is_loading'],
  ['case.status[5].is_loading', 'is_loading'],
  ['status.is_loading', 'is_loading'],
  ['is_loading', 'is_loading'],
  ['', ''],
  [undefined, ''],
];

describe('getSuffix', () => {
  TYPE_INFERENCES.forEach(([field, suffix]) => {
    it(`Correctly gets field suffix ${field} is ${suffix}`, async () => {
      expect(getFieldSuffix(field)).toBe(suffix);
    });
  });
});
