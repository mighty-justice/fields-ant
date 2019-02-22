/* global it, describe, expect */
import faker from 'faker';

import { Tester } from '@mighty-justice/tester';

import { FormCard } from '../../src';

function getDefaults (overrides?: any) {
  const field = overrides.field || 'law_firm'
    , editProps = { debounceWait: 0 }
    , endpoint = overrides.endpoint || 'legal-organizations'
    , type = overrides.type || 'objectSearchCreate'
    , createFields = overrides.createFields || [{ field: 'name', required: true }, { field: 'amount_owed' }]
    , fieldConfig = overrides.fieldConfig || { editProps, field, type, endpoint, createFields }
    , fieldSets = overrides.fieldSets || [[fieldConfig]]
    , onSave = jest.fn()
    , model = overrides.model || { law_firm: faker.random.uuid() }
    , props = { fieldSets, model, onSave }
    ;

  return {
    expectedLabel: 'Law Firm',
    fakeOwed: faker.finance.amount(),
    result: { id: faker.random.uuid(), name: faker.company.companyName() },
    searchTerm: faker.lorem.sentence(),

    createFields,
    endpoint,
    field,
    fieldConfig,
    fieldSets,
    onSave,
    props,
    type,

    ...overrides,
  };
}

async function getTester (props: any) {
  return (await new Tester(FormCard, { props }).mount());
}

async function searchFor (tester: any, field: string, result: any, searchTerm: string) {
  tester.endpoints['/legal-organizations/'] = { results: [result] };
  tester.changeInput(`input#${field}`, searchTerm);
  await tester.refresh();
  expect(tester.find('li').first().text()).toContain(result.name);
}

async function selectAddNew (tester: any) {
  tester.click('button.osc-add-new');
}

describe('objectSearchCreate', () => {
  it('Selects existing', async () => {
    const { field, props, onSave, searchTerm, result } = getDefaults({})
      , tester = await getTester(props);

    await searchFor(tester, field, result, searchTerm);

    // Select first result and test response
    tester.click('li');
    tester.submit();
    expect(onSave).toHaveBeenCalledWith({ law_firm: result });
  });

  it('Adds new', async () => {
    const { field, onSave, searchTerm, result, props, fakeOwed } = getDefaults({})
      , tester = await getTester(props) ;

    await searchFor(tester, field, result, searchTerm);
    await selectAddNew(tester);

    expect(tester.text()).toContain('Name');
    expect(tester.text()).toContain('Amount Owed');
    expect(tester.text()).toContain('Back');

    // Will not submit until required sub-form filled out
    tester.submit();
    expect(tester.text()).toContain('required');
    expect(onSave).not.toHaveBeenCalled();

    // Will not clear errors when changing valid field
    tester.changeInput('input[id="law_firm.amount_owed"]', fakeOwed);
    tester.submit();
    expect(tester.text()).toContain('required');
    expect(onSave).not.toHaveBeenCalled();

    // Will clear errors when fixing invalid field
    tester.changeInput('input[id="law_firm.name"]', searchTerm);
    tester.submit();
    expect(onSave).toHaveBeenCalledWith({ law_firm: { name: searchTerm, amount_owed: fakeOwed }});
  });

  it('Populates from search', async () => {
    const { field, onSave, searchTerm, result, props } = getDefaults({
        createFields: [
          { field: 'name', required: true, populateFromSearch: true },
          { field: 'amount_owed' },
        ],
      })
      , tester = await getTester(props);

    await searchFor(tester, field, result, searchTerm);
    await selectAddNew(tester);

    expect(tester.find('input[id="law_firm.name"]').html()).toContain(searchTerm);
    tester.submit();
    expect(onSave).toHaveBeenCalledWith({ law_firm: { name: searchTerm, amount_owed: '' }});
  });

  it('Populates name from search', async () => {
    const firstName = faker.name.firstName()
      , lastName = faker.name.lastName()
      , searchTerm = `${firstName} ${lastName}`
      , createFields = [
        { field: 'first_name', required: true, populateNameFromSearch: true },
        { field: 'last_name', required: true, populateNameFromSearch: true },
        { field: 'amount_owed' },
      ]
      , { field, onSave, result, props } = getDefaults({ createFields })
      , tester = await getTester(props);

    await searchFor(tester, field, result, searchTerm);
    await selectAddNew(tester);

    expect(tester.find('input[id="law_firm.first_name"]').html()).toContain(firstName);
    expect(tester.find('input[id="law_firm.last_name"]').html()).toContain(lastName);

    tester.submit();
    expect(onSave).toHaveBeenCalledWith({ law_firm: {
      amount_owed: '',
      first_name: firstName,
      last_name: lastName,
    }});
  });
});
