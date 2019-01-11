/* global it, describe, expect */
/* eslint-disable sort-keys */

import React from 'react';
import faker from 'faker';

import { Card } from '../../src ';
import { Tester } from '@mighty-justice/tester';

describe('Card', () => {
  it('Renders loader', async () => {
    const text = faker.lorem.sentence()
      , title = faker.lorem.sentence()
      , props = {
        cardConfig: {
          fieldSets: [[{ field: 'text' }]],
          title,
        },
        model: { text },
      };

    const noLoading = await new Tester(Card, { props }).mount();
    expect(noLoading.text()).toContain(title);
    expect(noLoading.text()).toContain(text);
    expect(noLoading.find('.ant-card').hasClass('ant-card-loading')).toBe(false);

    const yesLoading = await new Tester(Card, { props: { ...props, isLoading: true } }).mount();
    expect(yesLoading.text()).toContain(title);
    expect(yesLoading.text()).not.toContain(text);
    expect(yesLoading.find('.ant-card').hasClass('ant-card-loading')).toBe(true);
  });
});
