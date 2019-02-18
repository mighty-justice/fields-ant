/* global it, describe, expect */
// tslint:disable:no-inferred-empty-object-type
import faker from 'faker';
import { Tester } from '@mighty-justice/tester';

import { EditableCard } from '../../src';
import { editableCardPropsFactory } from '../factories';

describe('EditableCard', () => {
  it('Edits text', async () => {
    const text = faker.lorem.sentence()
      , newText = faker.lorem.sentence()
      , onSave = jest.fn().mockResolvedValue({})
      , props = {
        ...editableCardPropsFactory.build(),
        fieldSets: [[{ field: 'text', type: 'string' }]],
        model: { text },
        onSave,
      };

    const tester = await new Tester(EditableCard, { props }).mount();

    tester.click(`button.btn-edit`);
    tester.changeInput('input', newText);

    expect(onSave).not.toHaveBeenCalled();
    tester.submit();
    await tester.sleep();
    expect(onSave).toHaveBeenCalledWith({ text: newText });
  });

  it('Can be deleted', async () => {
    const onDelete = jest.fn().mockResolvedValue({})
      , props = { ...editableCardPropsFactory.build(), onDelete };

    const tester = await new Tester(EditableCard, { props }).mount();

    expect(onDelete).not.toHaveBeenCalled();
    tester.click(`button.btn-delete`);
    tester.click('.btn-delete .ant-popover-inner .ant-btn-primary');
    expect(onDelete).toHaveBeenCalled();
  });
});
