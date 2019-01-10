/* global it, describe, expect */
/* eslint-disable sort-keys */

import React from 'react';
import { mount } from 'enzyme';
import faker from 'faker';

import { EditableCard } from '../src';

function changeInput (component, value) {
  component.simulate('focus');
  component.simulate('change', { target: { value } });
  component.simulate('blur');
}

function sleep (ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('EditableCard', () => {
  it('Edits text', async () => {
    const text = faker.lorem.sentence()
      , newText = faker.lorem.sentence()
      , title = 'testing'
      , onSave = jest.fn().mockResolvedValue({})
      , props = {
        cardConfig: {
          fieldSets: [[{ field: 'text' }]],
          title,
        },
        model: { text },
        onSave,
      };

    const wrapper = mount(<EditableCard {...props} />);

    wrapper.find(`button.btn-edit-${title}`).simulate('click');
    changeInput(wrapper.find('input'), newText);

    expect(onSave).not.toHaveBeenCalled();
    wrapper.find('form').simulate('submit');
    await sleep();
    expect(onSave).toHaveBeenCalledWith({ text: newText });

  });
});
