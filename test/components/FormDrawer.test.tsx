import faker from 'faker';

import { FormDrawer } from '../../src';
import { Tester } from '@mighty-justice/tester';
import SmartBool from '@mighty-justice/smart-bool';

describe('FormDrawer', () => {
  it('Renders', async () => {
    const text = faker.lorem.sentence()
      , title = faker.lorem.sentence()
      , props = {
        fieldSets: [[{ field: 'text' }]],
        isVisible: new SmartBool(true),
        model: { text },
        title,
      };

    const tester = await new Tester(FormDrawer, { props }).mount();
    expect(tester.text()).toContain(title);
    expect(tester.text()).toContain('Text');
    expect(tester.html()).toContain(text);
  });
});
