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

const field = 'law_firm'
  , endpoint = 'legal-organizations'
  , expectedLabel = 'Law Firm'
  , type = 'objectSearchCreate'
  , required = true
  , createFields = [{ field: 'name', required }, { field: 'amount_owed' }]
  , fieldSets = [[{ field, type, endpoint, createFields }]]
  ;

describe('objectSearchCreate', () => {
  it('Renders', async () => {
    const props = {
        cardConfig: { fieldSets },
        model: { law_firm: faker.random.uuid() },
      };

    const tester = await new Tester(Card, { props }).mount();
    expect(tester.text()).toContain(expectedLabel);
  });

  it('Selects existing', async () => {
    const onSave = jest.fn()
      , searchTerm = faker.lorem.sentence()
      , result = { id: faker.random.uuid(), name: faker.company.companyName() }
      , props = {
        cardConfig: { fieldSets },
        onSave,
      };

    const tester = await new Tester(FormCard, { props }).mount();
    tester.endpoints['/legal-organizations/'] = { results: [result] };

    expect(tester.text()).toContain(expectedLabel);
    tester.find('#law_firm').first().simulate('click');
    changeInput(tester.find('input#law_firm'), searchTerm);
    await tester.refresh();
    expect(tester.find('li').text()).toContain(result.name);

    // Select first result and test response
    tester.find('li').simulate('click');
    tester.find('form').simulate('submit');
    expect(onSave).toHaveBeenCalledWith({ law_firm: result });
  });

  it('Adds new', async () => {
    const onSave = jest.fn()
      , searchTerm = faker.lorem.sentence()
      , result = { id: faker.random.uuid(), name: faker.company.companyName() }
      , props = {
        cardConfig: { fieldSets },
        onSave,
      };

    const tester = await new Tester(FormCard, { props }).mount();
    tester.endpoints['/legal-organizations/'] = { results: [result] };

    // Search for a lawfirm
    expect(tester.text()).toContain(expectedLabel);
    tester.find('#law_firm').first().simulate('click');
    changeInput(tester.find('input#law_firm'), searchTerm);
    await tester.refresh();
    expect(tester.find('li').text()).toContain(result.name);

    // Select add new and expect name and amount owed
    tester.find('button.osc-add-new').simulate('click');
    expect(tester.text()).toContain('Name');
    expect(tester.text()).toContain('Amount Owed');
    expect(tester.text()).toContain('Back');

    // Will not submit until required sub-form filled out
    tester.find('form').simulate('submit');
    expect(tester.text()).toContain('required');
    expect(onSave).not.toHaveBeenCalled();

    // Will submit after required sub-form filled out
    changeInput(tester.find('input#name'), searchTerm);
    tester.find('form').simulate('submit');
    expect(onSave).toHaveBeenCalledWith({ law_firm: { name: searchTerm }});
  });
});
