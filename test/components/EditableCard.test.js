/* global it, describe, expect */

import React from 'react';
import faker from 'faker';
import { Tester } from '@mighty-justice/tester';

import { EditableCard } from '../../src';

function changeInput (component, value) {
  component.simulate('focus');
  component.simulate('change', { target: { value } });
  component.simulate('blur');
}

describe('EditableCard', () => {
  it('Edits text', async () => {
    const text = faker.lorem.sentence()
      , newText = faker.lorem.sentence()
      , title = 'testing'
      , onSave = jest.fn().mockResolvedValue({})
      , props = {
        fieldSets: [[{ field: 'text' }]],
        model: { text },
        onSave,
        title,
      };

    const tester = await new Tester(EditableCard, { props }).mount();

    tester.find(`button.btn-edit`).simulate('click');
    changeInput(tester.find('input'), newText);

    expect(onSave).not.toHaveBeenCalled();
    tester.find('form').simulate('submit');
    await tester.sleep();
    expect(onSave).toHaveBeenCalledWith({ text: newText });
  });

  it('Can be deleted', async () => {
    const onSave = jest.fn().mockResolvedValue({})
      , onDelete = jest.fn().mockResolvedValue({})
      , props = {
        fieldSets: [[{ field: 'text' }]],
        model: { text: faker.lorem.sentence() },
        onDelete,
        onSave,
        title: faker.lorem.sentence(),
      };

    const tester = await new Tester(EditableCard, { props }).mount();

    expect(onDelete).not.toHaveBeenCalled();
    tester.find(`button.btn-delete`).simulate('click');
    tester.find('.btn-delete .ant-popover-inner .ant-btn-primary').first().simulate('click');
    expect(onDelete).toHaveBeenCalled();
  });
});
