/* global it, describe, expect */
import React from 'react';

import { Tester } from '@mighty-justice/tester';

import { Card, FormCard } from '../../src';

const field = 'is_open'
  , optionType = 'yesNo'
  , expectedLabel = 'Is Open'
  , type = 'optionSelect'
  , fieldSets = [[{ field, type, optionType }]]
  , model = { is_open: 'true' }
  ;

describe('optionSelect', () => {
  it('Renders', async () => {
    const props = {
        cardConfig: { fieldSets },
        model,
      };

    const tester = await new Tester(Card, { props }).mount();
    expect(tester.text()).toContain(expectedLabel);
    expect(tester.text()).toContain('Yes');
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
    expect(tester.text()).toContain('Yes');
  });

  it('Handles array with single value (useful for summary tables)', async () => {
    const props = {
        cardConfig: { fieldSets },
        model: { is_open: ['true'] },
      };

    const tester = await new Tester(Card, { props }).mount();
    expect(tester.text()).toContain(expectedLabel);
    expect(tester.text()).toContain('Yes');
  });

  it('Handles array with multiple values (useful for summary tables)', async () => {
    const props = {
        cardConfig: { fieldSets },
        model: { is_open: ['true', 'false'] },
      };

    const tester = await new Tester(Card, { props }).mount();
    expect(tester.text()).toContain(expectedLabel);
    expect(tester.text()).not.toContain('No');
    expect(tester.text()).not.toContain('Yes');
    expect(tester.text()).not.toContain('2 Values');
  });
});
