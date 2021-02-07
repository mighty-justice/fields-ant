/* tslint:disable:no-magic-numbers object-literal-sort-keys */
import { has } from 'lodash';
import faker from 'faker';
import { backendValidation } from '../../src/utilities';

const TEST_STRINGS: { [key: number]: string } = {};

function getString(key: number) {
  if (!has(TEST_STRINGS, key)) {
    TEST_STRINGS[key] = faker.lorem.sentence().replace('error', '');
  }
  return TEST_STRINGS[key];
}

const FIELD_NAMES = ['name', 'medicalfacility_website', 'medical_facility-fax'];

const TESTING_PAIRS = [
  {
    RESPONSE: {},
    FOUND_ON_FORM: {},
    ERROR_MESSAGES: [],
  },
  {
    RESPONSE: { name: [getString(1)] },
    FOUND_ON_FORM: { name: getString(1) },
    ERROR_MESSAGES: [],
  },
  {
    RESPONSE: { non_field_errors: [getString(2)] },
    FOUND_ON_FORM: {},
    ERROR_MESSAGES: [{ field: '', message: getString(2) }],
  },
  {
    RESPONSE: { plaintiff: [{ name: [getString(3)] }] },
    FOUND_ON_FORM: { name: getString(3) },
    ERROR_MESSAGES: [],
  },
  {
    RESPONSE: { medical_facility: { fax: [getString(4)] } },
    FOUND_ON_FORM: { 'medical_facility-fax': getString(4) },
    ERROR_MESSAGES: [],
  },
  {
    RESPONSE: { medical_facility: { website: [getString(4)] } },
    FOUND_ON_FORM: { medicalfacility_website: getString(4) },
    ERROR_MESSAGES: [],
  },
  {
    RESPONSE: { medical_facility: { branch: [getString(5)] } },
    FOUND_ON_FORM: {},
    ERROR_MESSAGES: [{ field: 'Medical Facility Branch', message: getString(5) }],
  },
  {
    RESPONSE: { is_account_created: false },
    FOUND_ON_FORM: {},
    ERROR_MESSAGES: [{ field: 'Is Account Created', message: 'No' }],
  },
  {
    RESPONSE: [getString(6)],
    FOUND_ON_FORM: {},
    ERROR_MESSAGES: [{ field: '', message: getString(6) }],
  },
  {
    RESPONSE: getString(7),
    FOUND_ON_FORM: {},
    ERROR_MESSAGES: [{ field: '', message: getString(7) }],
  },
  {
    RESPONSE: null,
    FOUND_ON_FORM: {},
    ERROR_MESSAGES: [{ field: '', message: 'Error submitting form' }],
  },
];

describe('Backend Validation', () => {
  TESTING_PAIRS.forEach((TEST_PAIR, i) => {
    it(`Correctly extracts backend validation messages, #${i + 1}`, async () => {
      const { RESPONSE, FOUND_ON_FORM, ERROR_MESSAGES } = TEST_PAIR;
      const { foundOnForm, errorMessages } = backendValidation(FIELD_NAMES, RESPONSE);

      expect(foundOnForm).toEqual(FOUND_ON_FORM);
      expect(errorMessages).toEqual(ERROR_MESSAGES);
    });
  });
});
