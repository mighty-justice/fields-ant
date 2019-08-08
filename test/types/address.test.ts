import { mapValues } from 'lodash';

import { Tester } from '@mighty-justice/tester';

import { FormCard } from '../../src';
import { TYPE_GENERATORS } from '../factories';

describe('address', () => {
  it('Nullifies if all attributes are empty by default', async () => {
    const { fieldConfigFactory, valueFunction } = TYPE_GENERATORS.address
      , value = valueFunction()
      , emptyValue = mapValues(value, () => '')
      , fieldConfig = fieldConfigFactory.build()
      , onSave = jest.fn()
      , props = { fieldSets: [[fieldConfig]], model: emptyValue, onSave }
    ;

    const tester = await new Tester(FormCard, {props}).mount();
    tester.submit();
    expect(onSave).toHaveBeenCalledWith({[fieldConfig.field]: null});
  });

  it('Does not nullify if overridden by fieldConfig', async () => {
    const { fieldConfigFactory, valueFunction } = TYPE_GENERATORS.address
      , value = valueFunction()
      , emptyValue = mapValues(value, () => '')
      , fieldConfig = { ...fieldConfigFactory.build(), nullify: false }
      , onSave = jest.fn()
      , props = { fieldSets: [[fieldConfig]], model: emptyValue, onSave }
    ;

    const tester = await new Tester(FormCard, {props}).mount();
    tester.submit();
    expect(onSave).toHaveBeenCalledWith({[fieldConfig.field]: emptyValue});
  });

  it('Automatically fills in state if smart mode is on', async () => {
    const { fieldConfigFactory, valueFunction } = TYPE_GENERATORS.address
      , value = valueFunction()
      , addressValues = mapValues(value, () => '02912')
      , fieldConfig = { ...fieldConfigFactory.build(), smart: true }
      , props = { fieldSets: [[fieldConfig]], model: { [fieldConfig.field]: addressValues } }
    ;

    const tester = await new Tester(FormCard, {props}).mount();
    expect(tester.html()).toContain('Rhode Island');
  });
});
