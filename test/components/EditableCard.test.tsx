// tslint:disable:no-inferred-empty-object-type
import faker from 'faker';
import { Tester } from '@mighty-justice/tester';

import { EditableCard, FormDrawer, FormModal } from '../../src';
import { editableCardPropsFactory } from '../factories';

describe('EditableCard', () => {
  [
    { where: 'inline', whereProps: {} },
    { where: 'in a FormModal', whereProps: { ModalComponent: FormModal } },
    { where: 'in a formDrawer', whereProps: { ModalComponent: FormDrawer } },
  ].forEach(({ where, whereProps }) => {
    it(`Edits text ${where}`, async () => {
      const text = faker.lorem.sentence()
        , newText = faker.lorem.sentence()
        , onSave = jest.fn().mockResolvedValue({})
        , props = {
          ...editableCardPropsFactory.build(),
          fieldSets: [[{ field: 'text', type: 'string' }]],
          model: { text },
          onSave,
          ...whereProps,
        };

      const tester = await new Tester(EditableCard, { props }).mount();

      if (whereProps.ModalComponent) {
        expect(tester.find(whereProps.ModalComponent).length).toBe(1);
      }

      tester.click(`button.btn-edit`);
      tester.changeInput('input', newText);

      expect(tester.find('FormCard').length).toBe(whereProps.ModalComponent ? 0 : 1);

      expect(onSave).not.toHaveBeenCalled();
      tester.submit();
      await tester.sleep();
      expect(onSave).toHaveBeenCalledWith({ text: newText });
    });
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
