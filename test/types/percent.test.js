/* global it, describe, expect */
import React from 'react';

import { Tester } from '@mighty-justice/tester';

import { Card, FormCard } from '../../src';

const field = 'projected_probability_of_success'
  , projected_probability_of_success = '0.278'
  , expectedDisplay = '27.80%'
  , expectedLabel = 'Projected Probability of Success'
  , type = 'percent'
  , fieldSets = [[{ field, type }]]
  ;

describe('percent', () => {
  it('Renders', async () => {
    const props = {
        cardConfig: { fieldSets },
        model: { projected_probability_of_success },
      };

    const tester = await new Tester(Card, { props }).mount();
    expect(tester.text()).toContain(expectedLabel);
    expect(tester.text()).toContain(expectedDisplay);
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
