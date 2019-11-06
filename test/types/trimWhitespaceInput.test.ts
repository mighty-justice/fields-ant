import * as faker from 'faker';

import { Tester } from '@mighty-justice/tester';

import { TYPE_GENERATORS, valueRenderPairs } from '../factories';

import { FormCard } from '../../src';

const { fieldConfigFactory } = TYPE_GENERATORS.email
    , fieldConfig = fieldConfigFactory.build()
    , fieldSets = [[fieldConfig]]
    , [value] = valueRenderPairs.email
    , model = { [fieldConfig.field]: value }
    ;

describe('TrimWhitespaceInput', () => {
  it('trims whitespace', async () => {
    const onSave = jest.fn()
      , props = { fieldSets, model, onSave }
      , fakeEmail = faker.internet.email()
      , emailWithSpace = `       ${fakeEmail}      `
      ;

    const tester = await new Tester(FormCard, { props }).mount();

    expect(onSave).not.toHaveBeenCalled();

    tester.changeInput(`input#${fieldConfig.field}`, emailWithSpace);

    expect(tester.html()).not.toContain(emailWithSpace);
    expect(tester.html()).toContain(fakeEmail);

    tester.submit();

    expect(onSave).toHaveBeenCalledWith({ [fieldConfig.field]: fakeEmail });
  });
});
