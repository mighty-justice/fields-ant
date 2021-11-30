import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS, DISPLAY_CARDS, fakeTextShort } from '../factories';

describe('renderTopRight', () => {
  DISPLAY_CARDS.forEach(componentName => {
    const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName];

    it(`${componentName} component handles renderTopRight`, async () => {
      const topRight = fakeTextShort(),
        renderTopRight = () => topRight,
        props = propsFactory.build({ renderTopRight }),
        tester = await new Tester(ComponentClass, { props }).mount();

      expect(tester.text()).toContain(topRight);
    });

    it(`${componentName} handles no renderTopRight`, async () => {
      const props: any = propsFactory.build(),
        { renderTopRight: _renderTopRight, ...propsWithoutRenderTopRight } = props,
        tester = await new Tester(ComponentClass, { props: propsWithoutRenderTopRight }).mount();

      // Basic smoke test that component renders
      expect(tester.html()).toContain('<div');
    });

    it(`${componentName} handles empty renderTopRight`, async () => {
      const renderTopRight = () => null,
        props = propsFactory.build({ renderTopRight }),
        tester = await new Tester(ComponentClass, { props }).mount();

      // Basic smoke test that component renders
      expect(tester.html()).toContain('<div');
    });
  });
});
