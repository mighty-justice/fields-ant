import faker from 'faker';

import { Tester } from '@mighty-justice/tester';

import { Table } from '../../src';
import { COMPONENT_GENERATORS } from '../factories';

describe('Table', () => {
  it('Renders', async () => {
    const text1 = faker.lorem.sentence(),
      text2 = faker.lorem.sentence(),
      title = faker.lorem.sentence(),
      props = {
        fieldSets: [[{ field: 'text' }, { field: 'nested.date' }]],
        model: [
          { id: '1', text: text1, nested: { date: '2001-01-01' } },
          { id: '2', text: text2, nested: { date: '1999-02-02' } },
        ],
        title,
      };

    const tester = await new Tester(Table, { props }).mount();
    expect(tester.text()).toContain(title);
    expect(tester.text()).toContain('Text');
    expect(tester.html()).toContain(text1);
    expect(tester.html()).toContain(text2);
    expect(tester.text()).toContain('02/02/99');
    expect(tester.text()).toContain('01/01/01');
  });

  it('Renders empty', async () => {
    const props = COMPONENT_GENERATORS.Table.propsFactory.build({ model: [] }),
      tester = await new Tester(Table, { props }).mount();

    expect(tester.text()).toContain('No Data');
  });
});
