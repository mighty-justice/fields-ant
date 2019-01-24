/* global it, describe, expect */
import React from 'react';
import faker from 'faker';

import { Tester } from '@mighty-justice/tester';

import { Card, FormCard } from '../../src';

function changeInput (component, value) {
  component.simulate('focus');
  component.simulate('change', { target: { value } });
  component.simulate('blur');
}

function getDefaults (overrides) {
  const field = overrides.field || 'law_firm'
    , endpoint = overrides.endpoint || 'legal-organizations'
    , type = overrides.type || 'objectSearchCreate'
    , createFields = overrides.createFields || [{ field: 'name', required: true }, { field: 'amount_owed' }]
    , fieldConfig = overrides.fieldConfig || { field, type, endpoint, createFields }
    , fieldSets = overrides.fieldSets || [[fieldConfig]]
    , onSave = jest.fn()
    , cardConfig = overrides.cardConfig || { fieldSets }
    , model = overrides.model || { law_firm: faker.random.uuid() }
    , props = { cardConfig, model, onSave }
    ;

  return {
    expectedLabel: 'Law Firm',
    result: { id: faker.random.uuid(), name: faker.company.companyName() },
    searchTerm: faker.lorem.sentence(),

    cardConfig,
    createFields,
    endpoint,
    field,
    fieldConfig,
    fieldSets,
    onSave,
    props,
    type,

    ...overrides,
  }
}

async function getTester (props) {
  return (await new Tester(FormCard, { props }).mount());
}

async function searchFor (tester, field, result, searchTerm) {
  tester.endpoints['/legal-organizations/'] = { results: [result] };
  changeInput(tester.find(`input#${field}`), searchTerm);
  await tester.refresh();
  expect(tester.find('li').text()).toContain(result.name);
}

async function selectAddNew (tester) {
  tester.find('button.osc-add-new').simulate('click');
}

describe('objectSearchCreate', () => {
  it('Renders', async () => {
    const { props, expectedLabel } = getDefaults({});
    const tester = await new Tester(Card, { props }).mount();
    expect(tester.text()).toContain(expectedLabel);
  });

  it('Selects existing', async () => {
    const { field, props, onSave, searchTerm, result } = getDefaults({})
      , tester = await getTester(props);

    await searchFor(tester, field, result, searchTerm);

    // Select first result and test response
    tester.find('li').simulate('click');
    tester.find('form').simulate('submit');
    expect(onSave).toHaveBeenCalledWith({ law_firm: result });
  });

  it('Adds new', async () => {
    const { field, onSave, searchTerm, result, props } = getDefaults({})
      , tester = await getTester(props) ;

    await searchFor(tester, field, result, searchTerm);
    await selectAddNew(tester);

    expect(tester.text()).toContain('Name');
    expect(tester.text()).toContain('Amount Owed');
    expect(tester.text()).toContain('Back');

    // Will not submit until required sub-form filled out
    tester.find('form').simulate('submit');
    expect(tester.text()).toContain('required');
    expect(onSave).not.toHaveBeenCalled();

    changeInput(tester.find('input#name'), searchTerm);
    tester.find('form').simulate('submit');
    expect(onSave).toHaveBeenCalledWith({ law_firm: { name: searchTerm }});
  });
});
