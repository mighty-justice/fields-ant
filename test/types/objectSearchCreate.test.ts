import faker from 'faker';

import { Tester } from '@mighty-justice/tester';

import { CX_PREFIX_SEARCH_CREATE, FormCard } from '../../src';
import { fakeTextShort, organizationResultFactory } from '../factories';

import { objectSearchFor } from './objectSearch.test';

function getDefaults (overrides?: any) {
  const field = overrides.field || 'law_firm'
    , editProps = { debounceWait: 0 }
    , endpoint = overrides.endpoint || '/legal-organizations/'
    , type = overrides.type || 'objectSearchCreate'
    , createFields = overrides.createFields || [{ field: 'name', required: true }, { field: 'amount_owed' }]
    , fieldConfig = { editProps, field, type, endpoint, createFields, ...overrides.fieldConfig }
    , fieldSets = overrides.fieldSets || [[fieldConfig]]
    , onSave = jest.fn()
    , model = overrides.model || { law_firm: null }
    , props = { fieldSets, model, onSave }
    ;

  return {
    expectedLabel: 'Law Firm',
    fakeOwed: faker.finance.amount(),
    results: organizationResultFactory.buildList(3),
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

async function clickAddNew (tester: any) {
  tester.click(`.${CX_PREFIX_SEARCH_CREATE}-item-add div`);
}

async function clickFirstResult (tester: any) {
  tester.find('li').at(1).simulate('click');
}

async function clickBack (tester: any) {
  tester.click(`.${CX_PREFIX_SEARCH_CREATE}-btn-back`);
}

describe('objectSearchCreate', () => {
  it('Selects existing', async () => {
    const { field, props, onSave, searchTerm, results } = getDefaults({})
      , tester = await getTester(props);

    await objectSearchFor(tester, field, results, searchTerm);

    clickFirstResult(tester);
    tester.submit();
    expect(onSave).toHaveBeenCalledWith({ law_firm: results[0] });
  });

  it('Adds new', async () => {
    const { field, onSave, searchTerm, results, props, fakeOwed } = getDefaults({})
      , tester = await getTester(props) ;

    await tester.submit();
    expect(onSave).toHaveBeenCalledWith(props.model);
    onSave.mockClear();

    await objectSearchFor(tester, field, results, searchTerm);
    await clickAddNew(tester);

    expect(tester.text()).toContain('Name');
    expect(tester.text()).toContain('Amount Owed');
    expect(tester.text()).toContain('Back');

    // Will not submit until required sub-form filled out
    tester.submit();
    expect(tester.text()).toContain('Required');
    expect(onSave).not.toHaveBeenCalled();

    // Will not clear errors when changing valid field
    tester.changeInput('input[id="law_firm.amount_owed"]', fakeOwed);
    tester.submit();
    expect(tester.text()).toContain('Required');
    expect(onSave).not.toHaveBeenCalled();

    // Will clear errors when fixing invalid field
    tester.changeInput('input[id="law_firm.name"]', searchTerm);
    tester.submit();
    expect(onSave).toHaveBeenCalledWith({ law_firm: { name: searchTerm, amount_owed: fakeOwed }});

    clickBack(tester);
    tester.submit();
    expect(onSave).toHaveBeenCalledWith(props.model);
  });

  it('Clears existing record on add new', async () => {
    const { field, onSave, searchTerm, results, props } = getDefaults({
        model: { law_firm: organizationResultFactory.build() },
      })
      , tester = await getTester(props)
      ;

    await objectSearchFor(tester, field, results, searchTerm);
    await clickAddNew(tester);

    // Will not submit until required sub-form filled out
    await tester.refresh();
    tester.submit();
    expect(onSave).not.toHaveBeenCalled();
    expect(tester.text()).toContain('Required');

    // Will clear errors when fixing invalid field
    tester.changeInput('input[id="law_firm.name"]', searchTerm);
    tester.submit();
    expect(onSave).toHaveBeenCalledWith({ law_firm: { name: searchTerm, amount_owed: null }});

    clickBack(tester);
    tester.submit();
    expect(onSave).toHaveBeenCalledWith(props.model);
  });

  it('Populates from search', async () => {
    const { field, onSave, searchTerm, results, props } = getDefaults({
        createFields: [
          { field: 'name', required: true, populateFromSearch: true },
          { field: 'amount_owed' },
        ],
      })
      , tester = await getTester(props);

    await objectSearchFor(tester, field, results, searchTerm);
    await clickAddNew(tester);

    expect(tester.find('input[id="law_firm.name"]').html()).toContain(searchTerm);
    tester.submit();
    expect(onSave).toHaveBeenCalledWith({ law_firm: { name: searchTerm, amount_owed: null }});
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
      , { field, onSave, results, props } = getDefaults({ createFields })
      , tester = await getTester(props);

    await objectSearchFor(tester, field, results, searchTerm);
    await clickAddNew(tester);

    expect(tester.find('input[id="law_firm.first_name"]').html()).toContain(firstName);
    expect(tester.find('input[id="law_firm.last_name"]').html()).toContain(lastName);

    tester.submit();
    expect(onSave).toHaveBeenCalledWith({ law_firm: {
      amount_owed: null,
      first_name: firstName,
      last_name: lastName,
    }});
  });

  it('Nullifies nullable create fields', async () => {
    const { field, onSave, searchTerm, results, props } = getDefaults({
        createFields: [
          { field: 'non_nullable' },
          { field: 'nullable', nullify: true },
        ],
      })
      , tester = await getTester(props);

    await objectSearchFor(tester, field, results, searchTerm);
    await clickAddNew(tester);
    tester.submit();

    expect(onSave).toHaveBeenCalledWith({ law_firm: { non_nullable: '', nullable: null }});
  });

  it('Renders and saves complex nested field sets', async () => {
    const legend = fakeTextShort()
      , submitValue = fakeTextShort()
      , { field, onSave, searchTerm, results, props } = getDefaults({
        createFields: { fields: [{ field: 'complex'}], legend },
      })
      , tester = await getTester(props);

    await objectSearchFor(tester, field, results, searchTerm);
    await clickAddNew(tester);
    await tester.refresh();

    expect(tester.text()).toContain(legend);
    tester.changeInput('input[id="law_firm.complex"]', submitValue);

    tester.submit();
    expect(onSave).toHaveBeenCalledWith({ law_firm: { complex: submitValue }});
  });

  it('Renders non-standard objects', async () => {
    const { field, onSave, searchTerm, results, props } = getDefaults({
        createFields: [
          { field: 'non_nullable' },
          { field: 'nullable', nullify: true },
        ],
        fieldConfig: {
          renderOption: (option: any) => `${option.first_name} FFF ${option.last_name}`,
          renderSelected: (option: any) => `${option.last_name} ZZZ ${option.first_name}`,
        },
        results: [{
          first_name: faker.name.firstName(),
          id: faker.random.uuid(),
          last_name: faker.name.lastName(),
        }],
      })
      , tester = await getTester(props);

    await objectSearchFor(tester, field, results, searchTerm);

    expect(tester.find('li').at(1).text()).toContain('FFF');
    clickFirstResult(tester);
    expect(tester.text()).toContain('ZZZ');
    tester.submit();

    expect(onSave).toHaveBeenCalledWith({ law_firm: results[0] });
  });
});
