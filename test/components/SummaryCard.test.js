/* global it, describe, expect */

import React from 'react';
import faker from 'faker';

import { SummaryCard } from '../../src';
import { Tester } from '@mighty-justice/tester';

describe('SummaryCard', () => {
  it('Renders', async () => {
    const text = faker.lorem.sentence()
      , title = faker.lorem.sentence()
      , props = {
        cardConfig: {
          fieldSets: [[{ field: 'text' }]],
          title,
        },
        model: { text },
      };

    const tester = await new Tester(SummaryCard, { props }).mount();
    expect(tester.text()).toContain(title);
    expect(tester.text()).toContain('Text');
    expect(tester.html()).toContain(text);
  });
});
