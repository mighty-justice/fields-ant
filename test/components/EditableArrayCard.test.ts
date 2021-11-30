import faker from 'faker';

import { Tester } from '@mighty-justice/tester';

import { EditableArrayCard } from '../../src';
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
  onSuccess = jest.fn(),
  props = {
    fieldSets: [[{ field: 'name' }]],
    model,
    onCreate,
    onSave,
    onSuccess,
    title,
  };

async function fillOutAndSubmit(tester: any, action: string, newValue: string) {
  expect(tester.find('input#name').length).toBe(0);
  await tester.click(`button.btn-${action}`);
  await tester.refresh();
  expect(tester.find('input#name').length).toBe(1);

  await tester.changeInput('input#name', newValue);
  await tester.submit();
}

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

  it('Handles onCreate', async () => {
    onCreate.mockClear();
    const newValue = fakeTextShort(),
      tester = await new Tester(EditableArrayCard, { props }).mount();

    await fillOutAndSubmit(tester, 'new', newValue);

    expect(onCreate).toHaveBeenCalledWith({ name: newValue });

    await tester.refresh();
    expect(tester.find('input#name').length).toBe(0);
  });

  it('Handles onSave', async () => {
    onSave.mockClear();
    const newValue = fakeTextShort(),
      tester = await new Tester(EditableArrayCard, { props }).mount();

    await fillOutAndSubmit(tester, 'edit', newValue);

    expect(onSave).toHaveBeenCalledWith({
      ...model[0],
      name: newValue,
    });

    await tester.refresh();
    expect(tester.find('input#name').length).toBe(0);
  });

  it('Handles onSuccess', async () => {
    onSuccess.mockClear();
    const newValue = fakeTextShort(),
      tester = await new Tester(EditableArrayCard, { props }).mount();

    await fillOutAndSubmit(tester, 'new', newValue);

    expect(onSuccess).toHaveBeenCalled();

    await tester.refresh();
    expect(tester.find('input#name').length).toBe(0);
  });
});
