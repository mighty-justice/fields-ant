import React from 'react';
import faker from 'faker';

import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS } from '../factories';
import { IValue } from '../../src/props';

const SUPPORTING_COMPONENTS = [
  'Form',
  'FormCard',
  'FormDrawer',
  'FormModal',
];

function extraRenderer (value: IValue) {
    if (value) {
      return <span id='test'>Hello</span>
    }
    return null;
}

// Tests that users can pass in optional formItemRenderExtra to render an extra under form item.
describe('formItemExtra', () => {
  SUPPORTING_COMPONENTS.forEach(componentName => {
    it(`Form item extras correctly renders in ${componentName}`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName]
        , name = faker.lorem.sentence()
        , props = propsFactory.build({
            fieldSets: [[{ field: 'name', formItemRenderExtra: extraRenderer }]]
            , model: { name }
        })
        , tester = await new Tester(ComponentClass, { props }).mount({ async: true });

      expect(tester.find('.ant-form-extra').length).toBe(1);
      expect(tester.find('.ant-form-extra #test').text()).toEqual('Hello');
    });

    it(`No form items extras render if no props passed in`, async () => {
        const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName]
          , props = propsFactory.build()
          , tester = await new Tester(ComponentClass, { props }).mount({ async: true });

        expect(tester.find('.ant-form-extra').length).toBe(0);
    });
  });
});
