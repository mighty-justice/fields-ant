import faker from 'faker';
import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS } from '../factories';
import React from 'react';

const SUPPORTING_COMPONENTS = [
  'Form',
  'FormCard',
  'FormDrawer',
  'FormModal',
];

// Tests that components respond to changes in fieldsets.
describe('respondToFieldsetsChange', () => {
  SUPPORTING_COMPONENTS.forEach(componentName => {
    it(`${componentName} successfully updates when fieldsets change`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName]
        , name = faker.lorem.sentence()
        , props = propsFactory.build({
            fieldSets: [[{ field: 'originalName', type: 'string' }]],
            model: { name },
        })
        , newProps = propsFactory.build({
          fieldSets: [[{ field: 'updatedName', type: 'string' }]],
          model: { name },
        });

      const tester = await new Tester(ComponentClass, { props }).mount({async: true});

      expect(tester.find('input[id="originalName"]').length).toBe(1);
      tester.wrapper.setProps({ children: React.cloneElement(tester.wrapper.props().children, newProps)});
      await tester.refresh();
      expect(tester.find('input[id="updatedName"]').length).toBe(1);
    });
  });
});
