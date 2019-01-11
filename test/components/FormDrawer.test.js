
/* global it, describe, expect */
/* eslint-disable sort-keys */

import React from 'react';
import faker from 'faker';

import { FormDrawer } from '../../src ';
import { Tester } from '@mighty-justice/tester';
import SmartBool from '@mighty-justice/smart-bool';

describe('FormDrawer', () => {
  it('Renders', async () => {
    const text = faker.lorem.sentence()
      , title = faker.lorem.sentence()
      , props = {
        fieldSets: [[{ field: 'text' }]],
        isVisible: new SmartBool(true),
        model: { text },
        title,
      };

    const noLoading = await new Tester(FormDrawer, { props }).mount();
    expect(noLoading.text()).toContain(title);
    expect(noLoading.text()).toContain('Text');
    expect(noLoading.html()).toContain(text);
  });
});
