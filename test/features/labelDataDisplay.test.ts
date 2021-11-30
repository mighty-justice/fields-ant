import { Tester } from '@mighty-justice/tester';
import { CARD_COMPONENTS, COMPONENT_GENERATORS, EDITABLE_CARDS, FORM_COMPONENTS, stringFactory } from '../factories';

const fieldSets = [[stringFactory.build()]],
  LAYOUTS = ['inline', 'vertical', 'horizontal'];

function isForm(tester: any) {
  return !!tester.find('button[type="submit"]').length;
}

describe('Renders', () => {
  CARD_COMPONENTS.forEach(componentName => {
    it(`defaults ${componentName} correctly`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName],
        props = propsFactory.build({ fieldSets }),
        tester = await new Tester(ComponentClass, { props }).mount();

      expect(tester.find('div.fields-ant-info-row-vertical').length).toBe(1);
      expect(tester.find('div.fields-ant-field-set-row-vertical').length).toBe(1);
      expect(tester.find('.fields-ant-info-label-vertical').length).toBe(1);
      expect(tester.find('.fields-ant-info-label-no-colon').length).toBe(1);
    });
  });

  FORM_COMPONENTS.forEach(componentName => {
    it(`defaults ${componentName} correctly`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName],
        props = propsFactory.build({ fieldSets }),
        tester = await new Tester(ComponentClass, { props }).mount();

      expect(tester.find('form.ant-form-vertical').length).toBe(1);
      expect(tester.find('form.fields-ant-form-no-colon').length).toBe(1);
      expect(tester.find('div.fields-ant-field-set-row-vertical').length).toBe(1);
      expect(tester.find('div.fields-ant-form-item-vertical').length).toBe(1);
    });
  });

  CARD_COMPONENTS.forEach(componentName => {
    LAYOUTS.forEach(layout => {
      it(`Displays ${layout} for ${componentName}`, async () => {
        const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName],
          props = propsFactory.build({ fieldSets, layout }),
          tester = await new Tester(ComponentClass, { props }).mount();

        expect(tester.find(`div.fields-ant-info-row-${layout}`).length).toBe(1);
        expect(tester.find(`div.fields-ant-field-set-row-${layout}`).length).toBe(1);
        expect(tester.find(`.fields-ant-info-label-${layout}`).length).toBe(1);
      });

      it(`Displays colon properly for ${layout} ${componentName}`, async () => {
        const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName],
          props = propsFactory.build({ fieldSets, layout, colon: true }),
          tester = await new Tester(ComponentClass, { props }).mount();

        if (layout === 'vertical') {
          expect(tester.find('.fields-ant-info-label-no-colon').length).toBe(1);
        } else {
          expect(tester.find('.fields-ant-info-label-colon').length).toBe(1);
        }
      });
    });
  });

  FORM_COMPONENTS.forEach(componentName => {
    LAYOUTS.forEach(layout => {
      it(`Displays ${layout} for ${componentName}`, async () => {
        const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName],
          props = propsFactory.build({ fieldSets, layout }),
          tester = await new Tester(ComponentClass, { props }).mount();

        expect(tester.find(`form.ant-form-${layout}`).length).toBe(1);
        expect(tester.find(`div.fields-ant-field-set-row-${layout}`).length).toBe(1);
        expect(tester.find(`div.fields-ant-form-item-${layout}`).length).toBe(1);
      });

      it(`Displays colon properly for ${layout} ${componentName}`, async () => {
        const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName],
          props = propsFactory.build({ fieldSets, layout, colon: true }),
          tester = await new Tester(ComponentClass, { props }).mount();

        if (layout === 'vertical') {
          expect(tester.find('form.fields-ant-form-no-colon').length).toBe(1);
          expect(tester.find('div.fields-ant-form-item-no-colon').length).toBe(1);
        } else {
          expect(tester.find('form.fields-ant-form-colon').length).toBe(1);
          expect(tester.find('div.fields-ant-form-item-colon').length).toBe(1);
        }
      });
    });
  });

  EDITABLE_CARDS.forEach(componentName => {
    LAYOUTS.forEach(layout => {
      it(`Displays ${layout} when reading and writing for ${componentName}`, async () => {
        const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName],
          props = propsFactory.build({ fieldSets, layout }),
          tester = await new Tester(ComponentClass, { props }).mount();

        expect(isForm(tester)).toBe(false);
        expect(tester.find(`div.fields-ant-info-row-${layout}`).length).toBe(1);
        expect(tester.find(`div.fields-ant-field-set-row-${layout}`).length).toBe(1);
        expect(tester.find(`.fields-ant-info-label-${layout}`).length).toBe(1);

        await tester.click(`button.btn-edit`);
        await tester.refresh();

        expect(isForm(tester)).toBe(true);
        expect(tester.find(`form.ant-form-${layout}`).length).toBe(1);
        expect(tester.find(`div.fields-ant-field-set-row-${layout}`).length).toBe(1);
        expect(tester.find(`div.fields-ant-form-item-${layout}`).length).toBe(1);
      });
    });
  });
});
