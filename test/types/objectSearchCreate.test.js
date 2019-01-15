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
  , createFields = [{ field: 'name' }, { field: 'amount_owed' }]
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

  it('Edits', async () => {
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
  });
});
