/* global it, describe, expect */
import React from 'react';
import { Tester } from '@mighty-justice/tester';

import { FormCard } from '../../src';

describe('objectSearchCreate', () => {
  it('Renders', async () => {
    const onSave = jest.fn()
      , props = {
        cardConfig: { fieldSets: [[{ field: 'text', type: 'objectSearchCreate' }]] },
        onSave,
      };

    const tester = await new Tester(FormCard, { props }).mount();
    expect(tester.text()).toContain('Text');
  });
});
