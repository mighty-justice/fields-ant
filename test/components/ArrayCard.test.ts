import faker from 'faker';

import { Tester } from '@mighty-justice/tester';

import { ArrayCard } from '../../src';
import { COMPONENT_GENERATORS } from '../factories';

describe('ArrayCard', () => {
  it('Renders', async () => {
    const text1 = faker.lorem.sentence(),
      text2 = faker.lorem.sentence(),
      title = faker.lorem.sentence(),
      props = {
        fieldSets: [[{ field: 'text' }]],
        model: [
          { id: 1, text: text1 },
          { id: 2, text: text2 },
        ],
        title,
      };

    const tester = await new Tester(ArrayCard, { props }).mount();
    expect(tester.text()).toContain(title);
    expect(tester.text()).toContain('Text');
    expect(tester.html()).toContain(text1);
    expect(tester.html()).toContain(text2);
  });

  it('Renders empty', async () => {
    const props = COMPONENT_GENERATORS.ArrayCard.propsFactory.build({ model: [] }),
      tester = await new Tester(ArrayCard, { props }).mount();

    expect(tester.text()).toContain('No records');
  });
});
