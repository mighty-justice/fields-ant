/* global it, describe, expect */

import faker from 'faker';

import { FormModal } from '../../src';
import { Tester } from '@mighty-justice/tester';

describe('FormModal', () => {
  it('Renders', async () => {
    const text = faker.lorem.sentence()
      , title = faker.lorem.sentence()
      , props = {
        fieldSets: [[{ field: 'text' }]],
        model: { text },
        title,
      };

    const tester = await new Tester(FormModal, { props }).mount();
    expect(tester.text()).toContain(title);
    expect(tester.text()).toContain('Text');
    expect(tester.html()).toContain(text);
  });

  it('Renders children', async () => {
    const textChildren = faker.lorem.sentence()
      , textChildrenBefore = faker.lorem.sentence()
      , props = {
        children: textChildren,
        childrenBefore: textChildrenBefore,
        fieldSets: [],
        title: 'Children Modal',
      };

    const tester = await new Tester(FormModal, { props }).mount();
    expect(tester.text()).toContain(textChildren);
    expect(tester.text()).toContain(textChildrenBefore);
  });
});
