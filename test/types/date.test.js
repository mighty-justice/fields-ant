/* global it, describe, expect */
import React from 'react';

import { Tester } from '@mighty-justice/tester';

import { Card, FormCard } from '../../src';

const field = 'offered_on'
  , offered_on = '2017-11-22'
  , expectedDisplay = '11/22/17'
  , expectedLabel = 'Offered On'
  , type = 'date'
  , fieldSets = [[{ field, type }]]
  , model = { offered_on }
  ;

describe('date', () => {
  it('Renders', async () => {
    const props = {
        cardConfig: { fieldSets },
        model,
      };

    const tester = await new Tester(Card, { props }).mount();
    expect(tester.text()).toContain(expectedLabel);
    expect(tester.text()).toContain(expectedDisplay);
  });

  it('Edits', async () => {
    const onSave = jest.fn()
      , props = {
        cardConfig: { fieldSets },
        model,
        onSave,
      };

    const tester = await new Tester(FormCard, { props }).mount();
    expect(tester.text()).toContain(expectedLabel);
  });
});
