import { mapValues } from 'lodash';

import { Tester } from '@mighty-justice/tester';

import { FormCard } from '../../src';
import { TYPE_GENERATORS } from '../factories';

describe('address', () => {
  it('Nullifies if all attributes are empty by default', async () => {
    const { fieldConfigFactory, valueFunction } = TYPE_GENERATORS.address,
      value = valueFunction(),
      emptyValue = mapValues(value, () => ''),
      fieldConfig = fieldConfigFactory.build(),
      onSave = jest.fn(),
      props = { fieldSets: [[fieldConfig]], model: emptyValue, onSave };

    const tester = await new Tester(FormCard, { props }).mount();
    tester.submit();
    expect(onSave).toHaveBeenCalledWith({ [fieldConfig.field]: null });
  });

  it('Does not nullify if overridden by fieldConfig', async () => {
    const { fieldConfigFactory, valueFunction } = TYPE_GENERATORS.address,
      value = valueFunction(),
      emptyValue = mapValues(value, () => ''),
      fieldConfig = { ...fieldConfigFactory.build(), nullify: false },
      onSave = jest.fn(),
      props = { fieldSets: [[fieldConfig]], model: emptyValue, onSave };

    const tester = await new Tester(FormCard, { props }).mount();
    tester.submit();
    expect(onSave).toHaveBeenCalledWith({ [fieldConfig.field]: emptyValue });
  });
});
