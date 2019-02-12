/* global describe, it, expect */
import { fillInFieldConfig, TYPES } from '../../src';

const TYPE_INFERENCES = [
  ['boolean', 'case.status.is_loading'],
  ['boolean', 'case.status[5].is_loading'],
  ['boolean', 'is_loading'],
  ['date', 'appearance_date'],
  ['date', 'created_at'],
  ['date', 'created_on'],
  ['money', 'amount'],
  ['percentage', 'percent'],
  ['string', 'name'],
  ['text', 'body'],
  ['text', 'note'],
  ['text', 'summary'],
].concat(
  // ['duration', 'duration'],
  // ['email', 'email'],
  // ['rating', 'rating'],
  // etc.
  Object.keys(TYPES).map(s => [s, s]),
);

describe('inferType', () => {
  TYPE_INFERENCES.forEach(([type, field]) => {
    it(`Correctly infers field ${field} is type ${type}`, async () => {
      expect(fillInFieldConfig({ field }).type).toBe(type);
    });
  });
});
