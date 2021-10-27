import faker from 'faker';

import { EditableArrayCard } from '../../src';
import { Tester } from '@mighty-justice/tester';
import { fakeTextShort } from '../factories';

const title = faker.lorem.sentence(),
  model = Array(10)
    .fill(null)
    .map(_ => ({
      id: faker.random.uuid(),
      name: fakeTextShort(),
    })),
  onCreate = jest.fn(),
  onSave = jest.fn(),
  props = {
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
      const newValue = fakeTextShort(),
        tester = await new Tester(EditableArrayCard, { props }).mount();

      expect(tester.find('input#name').length).toBe(0);
      await tester.click(`button.btn-${action}`);
      expect(tester.find('input#name').length).toBe(1);

      expect(prop).not.toHaveBeenCalled();
      await tester.changeInput('input#name', newValue);
      await tester.submit();
      expect(prop).toHaveBeenCalledWith({
        ...(action === 'edit' ? model[0] : {}),
        name: newValue,
      });

      await tester.refresh();
      expect(tester.find('input#name').length).toBe(0);
    });
  });
});
