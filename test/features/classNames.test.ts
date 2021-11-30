import { Tester } from '@mighty-justice/tester';

import {
  FORM_COMPONENTS,
  COMPONENT_GENERATORS,
  fakeClassName,
  CARD_COMPONENTS,
  ARRAY_COMPONENTS,
  EDITABLE_CARDS,
} from '../factories';

describe('className', () => {
  FORM_COMPONENTS.forEach(componentName => {
    it(`${componentName} accepts className correctly`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName],
        className = fakeClassName(),
        props = propsFactory.build({ className }),
        tester = await new Tester(ComponentClass, { props }).mount();

      await tester.refresh();

      expect(
        tester
          .find('Form')
          .first()
          .props().className,
      ).toContain(className);
    });
  });

  CARD_COMPONENTS.filter(component => !ARRAY_COMPONENTS.includes(component)).forEach(componentName => {
    it(`${componentName} accepts className correctly`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName],
        className = fakeClassName(),
        props = propsFactory.build({ className }),
        tester = await new Tester(ComponentClass, { props }).mount();

      await tester.refresh();

      expect(
        tester
          .find('Card')
          .first()
          .props().className,
      ).toContain(className);

      if (EDITABLE_CARDS.includes(componentName)) {
        await tester.click('button.btn-edit');
        await tester.refresh();

        expect(
          tester
            .find('Card')
            .first()
            .props().className,
        ).toContain(className);
        expect(
          tester
            .find('Form')
            .first()
            .props().className,
        ).toContain(className);
      }
    });
  });
});
