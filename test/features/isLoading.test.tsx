/* global it, describe, expect */
import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS } from '../factories';

const SUPPORTING_COMPONENTS = [
  'Card',
  'EditableCard',
  'FormCard',
  'SummaryCard',
];

describe('isLoading', () => {
  SUPPORTING_COMPONENTS.forEach(componentName => {
    it(`Renders isLoading in ${componentName}`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName]
        , props = propsFactory.build()
        , isShowingLoader = (tester: Tester) => (
          tester
            .find('.ant-card')
            .hasClass('ant-card-loading')
        )
        ;

      const noLoading = await new Tester(ComponentClass, { props }).mount();
      expect(isShowingLoader(noLoading)).toBe(false);

      const yesLoading = await new Tester(ComponentClass, { props: { ...props, isLoading: true } }).mount();
      expect(isShowingLoader(yesLoading)).toBe(true);
    });
  });

  it(`Renders isLoading in Table`, async () => {
    const { ComponentClass, propsFactory } = COMPONENT_GENERATORS.Table
      , props = propsFactory.build()
      , isShowingLoader = (tester: Tester) => (
        tester
          .find('.ant-table-wrapper div.ant-spin-container')
          .hasClass('ant-spin-blur')
      );

    const noLoading = await new Tester(ComponentClass, { props }).mount();
    expect(isShowingLoader(noLoading)).toBe(false);

    const yesLoading = await new Tester(ComponentClass, { props: { ...props, isLoading: true } }).mount();
    expect(isShowingLoader(yesLoading)).toBe(true);
  });
});
