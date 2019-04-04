import faker from 'faker';
import { Tester } from '@mighty-justice/tester';

import { FormCard } from '../../src';
import { TYPE_GENERATORS } from '../factories';

describe('birthdate', () => {
  it('Edits', async () => {
    const { valueFunction, fieldConfigFactory } = TYPE_GENERATORS.birthdate
      , value = valueFunction()
      , newDay = faker.random.number({ min: 1, max: 9 }).toString().padStart(2)
      , newValue = value.substr(0, 8) + newDay
      , fieldConfig = fieldConfigFactory.build()
      , fieldSets = [[fieldConfig]]
      , model = { [fieldConfig.field]: value }
      , onSave = jest.fn()
      , props = { fieldSets, model, onSave }
      ;

    const tester = await new Tester(FormCard, { props }).mount();
    tester.changeInput(`input[id="${fieldConfig.field}.day"]`, newDay);
    tester.submit();
    expect(onSave).toHaveBeenCalledWith({ [fieldConfig.field]: newValue });
  });
});
