/* global it, describe, expect */
import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS } from '../factories';

const SUPPORTING_COMPONENTS = [
  'Card',
  'EditableCard',
  'FormCard',
  'SummaryCard',
];

describe('Renders', () => {
  SUPPORTING_COMPONENTS.forEach(componentName => {
    it(`Renders isLoading in ${componentName}`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName]
        , props = propsFactory.build();

      const noLoading = await new Tester(ComponentClass, { props }).mount();
      expect(noLoading.find('.ant-card').hasClass('ant-card-loading')).toBe(false);

      const yesLoading = await new Tester(ComponentClass, { props: { ...props, isLoading: true } }).mount();
      expect(yesLoading.find('.ant-card').hasClass('ant-card-loading')).toBe(true);
    });
  });
});
