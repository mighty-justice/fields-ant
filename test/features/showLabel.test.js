/* global it, describe, expect */

import React from 'react';
import faker from 'faker';
import { Tester } from '@mighty-justice/tester';

import { EditableCard } from '../../src';

describe('noLabel', () => {
  it('Respects noLabel attribute', async () => {
    const label = faker.lorem.sentence()
      , example_field = faker.lorem.sentence()
      , title = 'testing'
      , onSave = jest.fn().mockResolvedValue({})
      ;

    const withoutNoLabel = await new Tester(EditableCard, { props: {
      cardConfig: {
        fieldSets: [[{ field: 'example_field', label }]],
        title,
      },
      model: { example_field },
      onSave,
    }}).mount();
    expect(withoutNoLabel.text()).toContain(label);
    withoutNoLabel.find(`button.btn-edit`).simulate('click');
    expect(withoutNoLabel.text()).toContain(label);

    const withNoLabel = await new Tester(EditableCard, { props: {
      cardConfig: {
        fieldSets: [[{ field: 'example_field', label, showLabel: false }]],
        title,
      },
      model: { example_field },
      onSave,
    }}).mount();
    expect(withNoLabel.text()).not.toContain(label);
    withNoLabel.find(`button.btn-edit`).simulate('click');
    expect(withNoLabel.text()).not.toContain(label);
  });
});
