/* global it, describe, expect */

import React from 'react';
import faker from 'faker';

import { Cards } from '../../src';
import { Tester } from '@mighty-justice/tester';

describe('Cards', () => {
  it('Renders', async () => {
    const text = faker.lorem.sentence()
      , title = faker.lorem.sentence()
      , props = {
        cardConfigs: [{
          fieldSets: [[{ field: 'text' }]],
          title,
        }],
        model: { text },
      };

    const tester = await new Tester(Cards, { props }).mount();
    expect(tester.text()).toContain(title);
    expect(tester.text()).toContain('Text');
    expect(tester.html()).toContain(text);
  });
});
