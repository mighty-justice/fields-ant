import { ReactNode } from 'react';

import { RuleObject } from 'rc-field-form/lib/interface';

import { fillInFieldConfig } from '../../src/utilities';
import { IFieldConfigPartial } from '../../src/interfaces';

function getRequiredMessage(fieldConfig: IFieldConfigPartial): string | ReactNode {
  const requiredFieldConfig = fillInFieldConfig(fieldConfig),
    validator: RuleObject = requiredFieldConfig.formValidationRules.required as RuleObject;

  return validator.message;
}

describe('fillIn', () => {
  it('Correctly handles required value', async () => {
    const required = true,
      field = 'field';

    expect(getRequiredMessage({ required, field })).toBe(`'Field' is required`);

    expect(getRequiredMessage({ required, field, label: undefined })).toBe(`'Field' is required`);

    expect(getRequiredMessage({ required, field, label: 'Law Firm' })).toBe(`'Law Firm' is required`);

    expect(getRequiredMessage({ required, field, label: 'Law Firm', showLabel: false })).toBe(`'Law Firm' is required`);
  });
});
