import { Tester } from '@mighty-justice/tester';
import { COMPONENT_GENERATORS, stringFactory } from '../factories';

const fieldSets = [[stringFactory.build()]],
  EDITABLE_COMPONENTS = ['EditableCard', 'EditableArrayCard'],
  COMPONENTS = [
    ...EDITABLE_COMPONENTS,
    'ArrayCard',
    'FormCard',
    'SummaryCard',
    'Card',
    'Form',
    'FormModal',
    'FormDrawer',
  ],
  LAYOUTS = ['inline', 'vertical', 'horizontal'];

function isForm(tester: any) {
  return !!tester.find('button[type="submit"]').length;
}

describe('Renders', () => {
  COMPONENTS.forEach(componentName => {
    LAYOUTS.forEach(layout => {
      it(`Displays ${layout} for ${componentName}`, async () => {
        const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName],
          props = propsFactory.build({
            fieldSets,
            layout,
          }),
          tester = await new Tester(ComponentClass, { props }).mount();

        expect(tester.find(`.fields-ant-info-row-${layout}`).length);
        expect(tester.find(`.fields-ant-info-label-layout-${layout}`).length);
      });
    });
  });

  COMPONENTS.forEach(componentName => {
    LAYOUTS.forEach(layout => {
      it(`Displays colon properly for ${layout} ${componentName}`, async () => {
        const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName],
          props = propsFactory.build({
            fieldSets,
            layout,
            colon: true,
          }),
          tester = await new Tester(ComponentClass, { props }).mount();

        if (layout === 'vertical') {
          expect(tester.find('.fields-ant-info-label-no-colon').length);
        } else {
          expect(tester.find('.fields-ant-info-label-colon').length);
        }
      });
    });
  });

  EDITABLE_COMPONENTS.forEach(componentName => {
    LAYOUTS.forEach(layout => {
      it(`Displays ${layout} when reading and writing for ${componentName}`, async () => {
        const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName],
          props = propsFactory.build({
            fieldSets,
            layout,
          }),
          tester = await new Tester(ComponentClass, { props }).mount();

        expect(isForm(tester)).toBe(false);
        expect(tester.find(`.fields-ant-info-row-${layout}`).length);
        expect(tester.find(`.fields-ant-info-label-layout-${layout}`).length);

        tester.click(`button.btn-edit`);

        expect(isForm(tester)).toBe(true);
        expect(tester.find(`.fields-ant-info-row-${layout}`).length);
        expect(tester.find(`.fields-ant-info-label-layout-${layout}`).length);
      });
    });
  });
});
