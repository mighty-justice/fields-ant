/* global it, describe, expect */
/* eslint-disable sort-keys */

import React from 'react';
import { mount } from 'enzyme';
import faker from 'faker';

import { Card } from '../src';

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

    const noLoading = mount(<Card {...props} />);
    expect(noLoading.text()).toContain(title);
    expect(noLoading.text()).toContain(text);
    expect(noLoading.find('.ant-card').hasClass('ant-card-loading')).toBe(false);

    const yesLoading = mount(<Card isLoading={true} {...props} />);
    expect(yesLoading.text()).toContain(title);
    expect(yesLoading.text()).not.toContain(text);
    expect(yesLoading.find('.ant-card').hasClass('ant-card-loading')).toBe(true);
  });
});
