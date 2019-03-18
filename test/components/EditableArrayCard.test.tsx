import faker from 'faker';

import { EditableArrayCard } from '../../src';
import { Tester } from '@mighty-justice/tester';

const name1 = faker.lorem.sentence()
  , name2 = faker.lorem.sentence()
  , name3 = faker.lorem.sentence()
  , title = faker.lorem.sentence()
  , props = {
    fieldSets: [[{ field: 'name' }]],
    model: [{ id: 1, name: name1 }, { id: 2, name: name2 }],
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
    tester.click('button.btn-new');
    expect(tester.find('input#name').length).toBe(1);

    expect(onCreate).not.toHaveBeenCalled();
    tester.changeInput('input#name', name3);
    tester.submit();
    expect(onCreate).toHaveBeenCalledWith({ name: name3 });
  });
});
