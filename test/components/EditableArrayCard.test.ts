import faker from 'faker';

import { EditableArrayCard } from '../../src';
import { Tester } from '@mighty-justice/tester';
import { arrayCardPropsFactory, fakeTextShort } from '../factories';

const title = faker.lorem.sentence()
  , model = Array(10).fill(null).map(_ => ({
    id: faker.random.uuid(),
    name: fakeTextShort(),
  }))
  , onCreate = jest.fn()
  , onSave = jest.fn()
  , props = {
    fieldSets: [[{ field: 'name' }]],
    model,
    onCreate,
    onSave,
    title,
  };

describe('EditableArrayCard', () => {
  beforeEach(() => {
    onCreate.mockClear();
    onSave.mockClear();
  });

  it('Renders', async () => {
    const tester = await new Tester(EditableArrayCard, { props }).mount();
    expect(tester.text()).toContain(title);
    expect(tester.text()).toContain('Name');

    model.forEach(item => {
      expect(tester.html()).toContain(item.name);
    });
  });

  [
    { action: 'new', prop: onCreate },
    { action: 'edit', prop: onSave },
  ].forEach(({ action, prop }) => {
    it(`Handles ${action}`, async () => {
      const newValue = fakeTextShort()
        , tester = await new Tester(EditableArrayCard, { props }).mount();

      expect(tester.find('input#name').length).toBe(0);
      tester.click(`button.btn-${action}`);
      expect(tester.find('input#name').length).toBe(1);

      expect(prop).not.toHaveBeenCalled();
      tester.changeInput('input#name', newValue);
      tester.submit();
      expect(prop).toHaveBeenCalledWith({
        ...(action === 'edit' ? model[0] : {}),
        name: newValue,
      });

      await tester.refresh();
      expect(tester.find('input#name').length).toBe(0);
    });
  });

  it('Can disable add', async () => {
    const props = {
      ...arrayCardPropsFactory.build(),
      disableAdd: true,
    },
    tester = await new Tester(EditableArrayCard, { props }).mount();

    expect(tester.find('button.btn-new').props().disabled).toBe(true);
  });

  it('Can disabled delete and edit', async () => {
    const permissionName = 'canUpdate'
      , props = {
      ...arrayCardPropsFactory.build(),
      disableDelete: model => !model.permissions.includes(permissionName),
      disableEdit: model => !model.permissions.includes(permissionName),
      model: [{
        permissions: [],
      }],
      onDelete: jest.fn().mockResolvedValue({}),
    },
    tester = await new Tester(EditableArrayCard, { props }).mount();

    expect(tester.find('button.btn-delete').props().disabled).toBe(true);
    expect(tester.find('button.btn-edit').props().disabled).toBe(true);
  })
});
