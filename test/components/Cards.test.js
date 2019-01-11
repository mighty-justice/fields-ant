
/* global it, describe, expect */
/* eslint-disable sort-keys */

import React from 'react';
import faker from 'faker';

import { Cards } from '../../src ';
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

    const noLoading = await new Tester(Cards, { props }).mount();
    expect(noLoading.text()).toContain(title);
    expect(noLoading.text()).toContain('Text');
    expect(noLoading.html()).toContain(text);
  });
});
