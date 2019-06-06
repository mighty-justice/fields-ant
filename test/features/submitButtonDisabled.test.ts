import faker from 'faker';

import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS } from '../factories';

const SUPPORTING_COMPONENTS = [
  'Form',
  'FormCard',
  'FormDrawer',
  'FormModal',
];

// Tests whether submit button correctly enables and disables.
describe('submitButtonDisabled', () => {
  SUPPORTING_COMPONENTS.forEach(componentName => {
    it(`Submit button correctly disables in ${componentName}`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName]
        , name = faker.lorem.sentence()
        , props = propsFactory.build({
            fieldSets: [[{ field: 'name', required: true }]],
            model: { name },
        });

      const tester = await new Tester(ComponentClass, { props }).mount();
      expect(tester.find('.ant-btn-primary[disabled=true]').length).toBe(0);

      tester.changeInput('input', null);
      tester.click(tester.find('.ant-btn-primary'));
      expect(tester.find('.ant-btn-primary[disabled=true]').length).toBe(1);

      tester.changeInput('input', name);
      tester.click(tester.find('.ant-btn-primary'));
      expect(tester.find('.ant-btn-primary[disabled=true]').length).toBe(0);
    });

    it(`Submit button correctly disables in nested forms on ${componentName}`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName]
        , props = propsFactory.build({
            fieldSets: [[{ field: 'plaintiff.name'}]],
        });

      const tester = await new Tester(ComponentClass, { props }).mount();
      expect(tester.find('.ant-btn-primary[disabled=true]').length).toBe(0);

      tester.changeInput('input', 'Name');
      tester.click(tester.find('.ant-btn-primary'));
      expect(tester.find('.ant-btn-primary[disabled=true]').length).toBe(0);
    });
  });
});
