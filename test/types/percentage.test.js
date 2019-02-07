/* global it, describe, expect */
import React from 'react';

import { Tester } from '@mighty-justice/tester';

import { Card, FormCard } from '../../src';

const field = 'projected_probability_of_success'
  , projected_probability_of_success = '0.278'
  , expectedDisplay = '27.80%'
  , expectedLabel = 'Projected Probability of Success'
  , type = 'percentage'
  , fieldSets = [[{ field, type }]]
  , model = { projected_probability_of_success }
  ;

describe('percentage', () => {
  it('Renders', async () => {
    const props = {
        fieldSets,
        model,
      };

    const tester = await new Tester(Card, { props }).mount();
    expect(tester.text()).toContain(expectedLabel);
    expect(tester.text()).toContain(expectedDisplay);
  });

  it('Edits', async () => {
    const onSave = jest.fn()
      , props = {
        fieldSets,
        model,
        onSave,
      };

    const tester = await new Tester(FormCard, { props }).mount();
    expect(tester.text()).toContain(expectedLabel);
  });
});
