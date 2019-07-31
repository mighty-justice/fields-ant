import faker from 'faker';
import { Tester } from '@mighty-justice/tester';

import { FormCard } from '../../src';
import { TYPE_GENERATORS } from '../factories';

async function checkInferYear (newYear: string) {
  const { fieldConfigFactory } = TYPE_GENERATORS.date
    , fieldConfig = fieldConfigFactory.build()
    , fieldSets = [[fieldConfig]]
    , model = { [fieldConfig.field]: '0001-01-01' }
    , onSave = jest.fn()
    , props = { fieldSets, model, onSave }
    ;

  const tester = await new Tester(FormCard, { props }).mount();
  tester.changeInput(`input[id="${fieldConfig.field}.year"]`, newYear);
  tester.submit();
  return onSave.mock.calls[0][0][fieldConfig.field].slice(0, 4);
}

async function isInputsValid (month: string, day: string, year: string) {
  const { fieldConfigFactory } = TYPE_GENERATORS.date
    , fieldConfig = fieldConfigFactory.build()
    , fieldSets = [[fieldConfig]]
    , onSave = jest.fn()
    , props = { fieldSets, onSave }
    ;

  const tester = await new Tester(FormCard, { props }).mount();
  tester.changeInput(`input[id="${fieldConfig.field}.month"]`, month);
  tester.changeInput(`input[id="${fieldConfig.field}.day"]`, day);
  tester.changeInput(`input[id="${fieldConfig.field}.year"]`, year);
  await tester.refresh();
  await tester.submit();
  return !!onSave.mock.calls.length;
}

describe('date', () => {
  it('Edits', async () => {
    const { valueFunction, fieldConfigFactory } = TYPE_GENERATORS.date
      , value = valueFunction()
      , newDay = faker.random.number({ min: 1, max: 9 }).toString().padStart(2)
      , newValue = value.substr(0, 8) + newDay.trim().padStart(2, '0')
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

  it('Validates', async () => {
    expect(await isInputsValid('11', '22', '1989')).toBe(true);
    expect(await isInputsValid('01', '01', '0000')).toBe(true);
    expect(await isInputsValid('01', '01', '0998')).toBe(true);
    expect(await isInputsValid('1', '1', '1998')).toBe(true);

    // Check for impossible 0 dates
    expect(await isInputsValid('00', '00', '0000')).toBe(false);
    expect(await isInputsValid('00', '01', '0000')).toBe(false);
    expect(await isInputsValid('01', '00', '0000')).toBe(false);

    // Partial years
    expect(await isInputsValid('01', '01', '8')).toBe(false);
    expect(await isInputsValid('01', '01', '98')).toBe(true);
    expect(await isInputsValid('01', '01', '998')).toBe(false);
    expect(await isInputsValid('01', '01', '1998')).toBe(true);

    // Sillyness
    expect(await isInputsValid('11', '22', '1989a')).toBe(false);
    expect(await isInputsValid('11', '22', '----')).toBe(false);
    expect(await isInputsValid('11', '22', '1989-')).toBe(false);
    expect(await isInputsValid('', '', '')).toBe(false);
    expect(await isInputsValid('D', 'o', 'g')).toBe(false);
  });

  it('Infers century', async () => {
    expect(await checkInferYear('00')).toBe('2000');
    expect(await checkInferYear('19')).toBe('2019');
    expect(await checkInferYear('50')).toBe('1950');
    expect(await checkInferYear('98')).toBe('1998');
  });

  it('Changes input before submission', async () => {
    const { fieldConfigFactory } = TYPE_GENERATORS.date
      , fieldConfig = fieldConfigFactory.build()
      , fieldSets = [[fieldConfig]]
      , onSave = jest.fn()
      , props = { fieldSets, onSave, required: false }
      ;

    const tester = await new Tester(FormCard, { props }).mount();

    tester.changeInput(`input[id="${fieldConfig.field}.month"]`, '01');
    tester.changeInput(`input[id="${fieldConfig.field}.day"]`, '01');
    tester.changeInput(`input[id="${fieldConfig.field}.year"]`, '2019');

    tester.changeInput(`input[id="${fieldConfig.field}.month"]`, '');
    tester.changeInput(`input[id="${fieldConfig.field}.day"]`, '');
    tester.changeInput(`input[id="${fieldConfig.field}.year"]`, '');
    await tester.submit();

    expect(!!onSave.mock.calls.length).toBe(true);
    });
});
