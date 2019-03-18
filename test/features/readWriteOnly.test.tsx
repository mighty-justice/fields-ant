import { Tester } from '@mighty-justice/tester';
import { COMPONENT_GENERATORS, fakeField, fakeTextShort } from '../factories';

const readOnly = { type: 'string', field: fakeField(), readOnly: true, label: fakeTextShort() }
  , writeOnly = { type: 'string', field: fakeField(), writeOnly: true, label: fakeTextShort() }
  , normal = { type: 'string', field: fakeField(), label: fakeTextShort() }
  , WRITE_COMPONENTS = [
    'FormCard',
  ]
  , READ_COMPONENTS = [
    'Card',
  ]
  ;

describe('Renders', () => {
  WRITE_COMPONENTS.forEach(componentName => {
    it(`Shows writeOnly but not readOnly in ${componentName}`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName]
        , onSave = jest.fn()
        , props = propsFactory.build({ onSave, fieldSets: [[readOnly, writeOnly, normal]] })
        , tester = await new Tester(ComponentClass, { props }).mount()
        ;

      expect(tester.text()).toContain(normal.label);
      expect(tester.text()).toContain(writeOnly.label);
      expect(tester.text()).not.toContain(readOnly.label);

      tester.submit();
      const submitData = onSave.mock.calls[0][0];

      expect(submitData[normal.field]).toBe('');
      expect(submitData[writeOnly.field]).toBe('');
      expect(submitData[readOnly.field]).toBe(undefined);
    });
  });

  READ_COMPONENTS.forEach(componentName => {
    it(`Shows readOnly but not writeOnly in ${componentName}`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName]
        , onSave = jest.fn()
        , props = propsFactory.build({ onSave, fieldSets: [[readOnly, writeOnly, normal]] })
        , tester = await new Tester(ComponentClass, { props }).mount()
        ;

      expect(tester.text()).toContain(normal.label);
      expect(tester.text()).not.toContain(writeOnly.label);
      expect(tester.text()).toContain(readOnly.label);
    });
  });
});
