/* global it, describe, expect */
/* eslint-disable sort-keys */

import React from 'react';

import { ObjectSearchCreate, FormCard } from '../../src';
import { Tester } from '@mighty-justice/tester';

describe('ObjectSearchCreate', () => {
  it('Renders', async () => {
    const onSave = jest.fn()
      , props = {
        cardConfig: { fieldSets: [[{ field: 'text', type: 'objectSearchCreate' }]] },
        onSave,
      };

    const noLoading = await new Tester(FormCard, { props }).mount();
    expect(noLoading.text()).toContain('Text');
  });
});
