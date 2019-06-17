import faker from 'faker';

import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS } from '../factories';

const SUPPORTING_COMPONENTS = [
  'Form',
  'FormCard',
  'FormDrawer',
  'FormModal',
];

// Tests that users can pass in optional extraFieldConfig props to render an extra under form item.
describe('formItemExtra', () => {
  SUPPORTING_COMPONENTS.forEach(componentName => {
    it(`Form item extras correctly renders in ${componentName}`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName]
        , name = faker.lorem.sentence()
        , name2 = faker.lorem.sentence()
        , props = propsFactory.build({
            fieldSets: [[{ field: 'name'
            , formItemProps: { extraFieldConfig: {label: 'ExtraField', showLabel: true, tooltip: null} } }]],
            model: { name, name2 },
        });

      const tester = await new Tester(ComponentClass, { props }).mount();
      expect(tester.find('.ant-form-extra').length).toBe(1);
    });
  });
});
