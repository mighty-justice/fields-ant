/* global it, describe, expect */

import React from 'react';
import faker from 'faker';

import { EditableArrayCard } from '../../src';
import { Tester } from '@mighty-justice/tester';

function changeInput (component, value) {
  component.simulate('focus');
  component.simulate('change', { target: { value } });
  component.simulate('blur');
}

const name1 = faker.lorem.sentence()
  , name2 = faker.lorem.sentence()
  , name3 = faker.lorem.sentence()
  , title = faker.lorem.sentence()
  , props = {
    fieldSets: [[{ field: 'name' }]],
    model: [{ id: 1, name: name1 }, { id: 2,  name: name2 }],
    title,
  };

describe('EditableArrayCard', () => {
  it('Renders', async () => {
    const tester = await new Tester(EditableArrayCard, { props }).mount();
    expect(tester.text()).toContain(title);
    expect(tester.text()).toContain('Name');
    expect(tester.html()).toContain(name1);
    expect(tester.html()).toContain(name2);
  });

  it('Handles add new', async () => {
    const onCreate = jest.fn()
      , tester = await new Tester(EditableArrayCard, { props: { ...props, onCreate } }).mount();
    expect(tester.find('input#name').length).toBe(0);
    tester.find('button.btn-new').simulate('click');
    expect(tester.find('input#name').length).toBe(1);

    expect(onCreate).not.toHaveBeenCalled();
    changeInput(tester.find('input#name'), name3);
    tester.find('form').simulate('submit');
    expect(onCreate).toHaveBeenCalledWith({ name: name3 });
  });
});
