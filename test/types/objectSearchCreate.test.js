/* global it, describe, expect */
import React from 'react';
import faker from 'faker';

import { Tester } from '@mighty-justice/tester';

import { Card, FormCard } from '../../src';

const field  = 'law_firm'
  , endpoint = 'legal-organizations'
  , expectedLabel = 'Law Firm'
  , type = 'objectSearchCreate'
  , fieldSets = [[{ field, type, endpoint }]]
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
      , props = {
        cardConfig: { fieldSets },
        onSave,
      };

    const tester = await new Tester(FormCard, { props }).mount();
    expect(tester.text()).toContain(expectedLabel);
  });
});
