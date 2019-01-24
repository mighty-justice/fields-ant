/* global it, describe, expect */
import React from 'react';

import { Tester } from '@mighty-justice/tester';

import { Card, FormCard } from '../../src';

const field = 'is_open'
  , optionType = 'yesNo'
  , expectedLabel = 'Is Open'
  , type = 'radio'
  , fieldSets = [[{ field, type, optionType }]]
  , model = { is_open: 'true' }
  ;

describe('radio', () => {
  it('Renders', async () => {
    const props = {
        cardConfig: { fieldSets },
        model,
      };

    const tester = await new Tester(Card, { props }).mount();
    expect(tester.text()).toContain(expectedLabel);
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
