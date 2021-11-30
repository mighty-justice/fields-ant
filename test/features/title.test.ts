import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS, fakeTextShort } from '../factories';

describe('title', () => {
  Object.keys(COMPONENT_GENERATORS).forEach(componentName => {
    const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName];

    it(`${componentName} component handles title prop`, async () => {
      const title = fakeTextShort(),
        props = propsFactory.build({ title }),
        tester = await new Tester(ComponentClass, { props }).mount();

      expect(tester.text()).toContain(title);
    });

    it(`${componentName} handles no title prop`, async () => {
      const props: any = propsFactory.build(),
        { title: _title, ...propsWithoutTitle } = props,
        tester = await new Tester(ComponentClass, { props: propsWithoutTitle }).mount();

      // Basic smoke test that component renders
      expect(tester.html()).toContain('<div');
    });

    it(`${componentName} handles empty title prop`, async () => {
      const props: any = propsFactory.build({ title: '' }),
        tester = await new Tester(ComponentClass, { props }).mount();

      // Basic smoke test that component renders
      expect(tester.html()).toContain('<div');
    });
  });
});
