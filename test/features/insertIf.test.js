/* global it, describe, expect */

import React from 'react';
import faker from 'faker';
import { Tester } from '@mighty-justice/tester';

import { EditableCard } from '../../src';

const title = 'testing'
  , example_field = faker.lorem.sentence()
  , label = faker.lorem.sentence()
  , secondLabel = faker.lorem.sentence()
  , legend = faker.lorem.sentence()
  , field = 'example_field'
  , secondFieldSet = [{ field: 'second_example_field', label: secondLabel }]
  ;


describe('insertIf', () => {
  it('Shows if no insertIf attribute', async () => {
    const onSave = jest.fn().mockResolvedValue({})
     , tester = await new Tester(EditableCard, { props: {
      fieldSets: [{ fields: [{ field, label }], legend }, secondFieldSet],
      model: { example_field },
      onSave,
      title,
    }}).mount();

    expect(tester.text()).toContain(legend);
    expect(tester.text()).toContain(label);
    expect(tester.text()).toContain(secondLabel);
    tester.find(`button.btn-edit`).simulate('click');
    expect(tester.text()).toContain(legend);
    expect(tester.text()).toContain(label);
    expect(tester.text()).toContain(secondLabel);
  });

  it('Hides if insertIf returns false', async () => {
    const onSave = jest.fn().mockResolvedValue({})
      , insertIf = jest.fn(values => false)
      , tester = await new Tester(EditableCard, { props: {
      fieldSets: [{ fields: [{ field, label, insertIf }], legend }, secondFieldSet],
      model: { example_field },
      onSave,
      title,
    }}).mount();

    expect(tester.text()).not.toContain(legend);
    expect(tester.text()).not.toContain(label);
    expect(tester.text()).toContain(secondLabel);
    tester.find(`button.btn-edit`).simulate('click');
    expect(tester.text()).not.toContain(legend);
    expect(tester.text()).not.toContain(label);
    expect(tester.text()).toContain(secondLabel);
  });

  it('Shows if insertIf returns true', async () => {
    const onSave = jest.fn().mockResolvedValue({})
      , insertIf = jest.fn(values => true)
      , tester = await new Tester(EditableCard, { props: {
      fieldSets: [{ fields: [{ field, label, insertIf }], legend }, secondFieldSet],
      model: { example_field },
      onSave,
      title,
    }}).mount();

    expect(tester.text()).toContain(legend);
    expect(tester.text()).toContain(label);
    expect(tester.text()).toContain(secondLabel);
    tester.find(`button.btn-edit`).simulate('click');
    expect(tester.text()).toContain(legend);
    expect(tester.text()).toContain(label);
    expect(tester.text()).toContain(secondLabel);
  });
});
