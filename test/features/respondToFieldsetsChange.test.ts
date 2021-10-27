import { Tester } from '@mighty-justice/tester';
import { omit } from 'lodash';

import { COMPONENT_GENERATORS } from '../factories';
import React from 'react';

const SUPPORTING_COMPONENTS = ['Form', 'FormCard', 'FormDrawer', 'FormModal'];

function getProps(componentName: string): any {
  const { propsFactory } = COMPONENT_GENERATORS[componentName],
    onSave = jest.fn();

  return omit(
    propsFactory.build({
      onSave,
    }),
    ['isVisible'],
  );
}

async function changeProps(tester: Tester, props: object) {
  tester.wrapper.setProps({ children: React.cloneElement(tester.wrapper.props().children, props) });
  await tester.refresh();
}

// Tests that components respond to changes in fieldsets.
describe('respondToFieldsetsChange', () => {
  SUPPORTING_COMPONENTS.forEach(componentName => {
    it(`${componentName} successfully updates when field name changes`, async () => {
      const { ComponentClass } = COMPONENT_GENERATORS[componentName],
        props = getProps(componentName),
        oldProps = { ...props, fieldSets: [[{ field: 'originalName', type: 'string' }]] },
        newProps = { ...props, fieldSets: [[{ field: 'updatedName', type: 'string' }]] };

      const tester = await new Tester(ComponentClass, { props: oldProps }).mount();

      expect(tester.find('input[id="originalName"]').length).toBe(1);
      expect(tester.find('input[id="updatedName"]').length).toBe(0);

      await tester.submit();
      expect(props.onSave).toHaveBeenCalledWith({ originalName: '' });

      props.onSave.mockClear();

      await changeProps(tester, newProps);

      expect(tester.find('input[id="originalName"]').length).toBe(0);
      expect(tester.find('input[id="updatedName"]').length).toBe(1);

      await tester.submit();
      expect(props.onSave).toHaveBeenCalledWith({ updatedName: '' });
    });

    it(`${componentName} successfully updates when the number of FieldSets change`, async () => {
      const { ComponentClass } = COMPONENT_GENERATORS[componentName],
        props = getProps(componentName),
        oldProps = { ...props, fieldSets: [[{ field: 'fieldName0', type: 'string' }]] },
        newProps = {
          ...props,
          fieldSets: [[{ field: 'fieldName0', type: 'string' }], [{ field: 'fieldName1', type: 'string' }]],
        };

      const tester = await new Tester(ComponentClass, { props: oldProps }).mount();

      expect(tester.find('input[id="fieldName0"]').length).toBe(1);
      expect(tester.find('input[id="fieldName1"]').length).toBe(0);

      await tester.submit();
      expect(props.onSave).toHaveBeenCalledWith({ fieldName0: '' });

      props.onSave.mockClear();

      await changeProps(tester, newProps);

      expect(tester.find('input[id="fieldName0"]').length).toBe(1);
      expect(tester.find('input[id="fieldName1"]').length).toBe(1);

      await tester.submit();
      expect(props.onSave).toHaveBeenCalledWith({ fieldName0: '', fieldName1: '' });
    });
  });
});
