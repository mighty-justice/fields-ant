import { Tester } from '@mighty-justice/tester';
import { COMPONENT_GENERATORS, fakeField, fakeTextShort } from '../factories';

const readOnly = { field: fakeField(), label: fakeTextShort(), readOnly: true, type: 'string' }
  , readOnly2 = { field: fakeField(), label: fakeTextShort(), readOnly: true, type: 'string' }
  , writeOnly = { field: fakeField(), label: fakeTextShort(), writeOnly: true, type: 'string' }
  , writeOnly2 = { field: fakeField(), label: fakeTextShort(), writeOnly: true, type: 'string' }
  , normal = { field: fakeField(), label: fakeTextShort(), type: 'string' }
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
        , props = propsFactory.build({
          fieldSets: [[readOnly, writeOnly, normal], [readOnly2], [writeOnly2]],
          onSave,
        })
        , tester = await new Tester(ComponentClass, { props }).mount()
        ;

      expect(tester.text()).toContain(normal.label);
      expect(tester.text()).toContain(writeOnly.label);
      expect(tester.text()).not.toContain(readOnly.label);

      tester.submit();
      const submitData = onSave.mock.calls[0][0];

      expect(submitData[normal.field]).toBe('');
      expect(submitData[writeOnly.field]).toBe('');
      expect(submitData[writeOnly2.field]).toBe('');
      expect(submitData[readOnly.field]).toBe(undefined);
      expect(submitData[readOnly2.field]).toBe(undefined);
    });
  });

  READ_COMPONENTS.forEach(componentName => {
    it(`Shows readOnly but not writeOnly in ${componentName}`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName]
        , onSave = jest.fn()
        , props = propsFactory.build({
          fieldSets: [[readOnly, writeOnly, normal], [readOnly2], [writeOnly2]],
          onSave,
        })
        , tester = await new Tester(ComponentClass, { props }).mount()
        ;

      expect(tester.text()).toContain(normal.label);
      expect(tester.text()).not.toContain(writeOnly.label);
      expect(tester.text()).not.toContain(writeOnly2.label);
      expect(tester.text()).toContain(readOnly.label);
      expect(tester.text()).toContain(readOnly2.label);
    });
  });
});
