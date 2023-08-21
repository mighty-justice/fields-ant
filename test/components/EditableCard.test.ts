// tslint:disable:no-inferred-empty-object-type
import faker from 'faker';
import { Tester } from '@mighty-justice/tester';

import { EditableCard, FormDrawer, FormModal } from '../../src';
import { editableCardPropsFactory } from '../factories';

function isForm(tester: Tester) {
  return !!tester.find('button[type="submit"]').length;
}

describe('EditableCard', () => {
  [
    { where: 'inline', whereProps: {} },
    { where: 'in a FormModal', whereProps: { ModalComponent: FormModal } },
    { where: 'in a formDrawer', whereProps: { ModalComponent: FormDrawer } },
  ].forEach(({ where, whereProps }) => {
    it(`Edits text ${where}`, async () => {
      const text = faker.lorem.sentence(),
        newText = faker.lorem.sentence(),
        onSave = jest.fn().mockResolvedValue({}),
        props = {
          ...editableCardPropsFactory.build(),
          fieldSets: [[{ field: 'text', type: 'string' }]],
          model: { text },
          onSave,
          ...whereProps,
        };

      const tester = await new Tester(EditableCard, { props }).mount();

      expect(isForm(tester)).toBe(false);
      if (whereProps.ModalComponent) {
        expect(tester.find(whereProps.ModalComponent).length).toBe(1);
      }

      await tester.click('button.btn-edit');
      await tester.refresh();
      await tester.changeInput('input', newText);

      expect(isForm(tester)).toBe(true);

      expect(onSave).not.toHaveBeenCalled();
      await tester.submit();
      await tester.sleep();
      expect(onSave).toHaveBeenCalledWith({ text: newText });

      expect(isForm(tester)).toBe(false);
    });
  });

  it('Can be deleted', async () => {
    const onDelete = jest.fn().mockResolvedValue({}),
      props = { ...editableCardPropsFactory.build(), onDelete };

    const tester = await new Tester(EditableCard, { props }).mount();

    expect(onDelete).not.toHaveBeenCalled();
    await tester.click(`button.btn-delete`);
    await tester.refresh();
    await tester.click('.btn-delete .ant-popover-inner .ant-btn-primary');
    expect(onDelete).toHaveBeenCalled();
  });

  it('Disables delete and shows tooltip', async () => {
    const onDelete = jest.fn().mockResolvedValue({}),
      props = {
        ...editableCardPropsFactory.build(),
        onDelete,
        model: { protectedField: ['Protected Object'] },
        protectedField: 'protectedField',
      },
      tester = await new Tester(EditableCard, { props }).mount();

    await tester.click(`button.btn-delete`);
    await tester.refresh();
    expect(tester.find('.btn-delete .ant-popover-inner .ant-btn-primary').length).toBe(0);
    expect(onDelete).not.toHaveBeenCalled();
  });
});
