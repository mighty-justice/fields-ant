import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS, fakeTextShort, TYPE_GENERATORS } from '../factories';

describe('Uses correct field ID', () => {
  Object.entries(TYPE_GENERATORS).forEach(([type, { fieldConfigFactory }]) => {
    it(`Type ${type} uses correct field ID`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS.Form,
        fieldConfig = fieldConfigFactory.build(),
        fieldSets = [[fieldConfig]],
        { field } = fieldConfig,
        props = propsFactory.build({ fieldSets }),
        tester = await new Tester(ComponentClass, { props }).mount();

      expect(tester.find(`[id="${field}"]`).exists()).toBe(true);
    });
  });

  [
    ['simple', 'field'],
    ['nested', 'container.field'],
    ['deeply nested', 'container.field.subfield'],
    // TODO: Enable after array bug fix
    // ['array', 'array[0].field'],
    // ['deeply nested array', 'container.field[0].field'],
  ].map(([label, field]) =>
    it(`Editable ${label} fields use correct field ID`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS.Form,
        fieldConfig = TYPE_GENERATORS.string.fieldConfigFactory.build({ field, type: 'string' }),
        fieldSets = [[fieldConfig]],
        onSave = jest.fn(),
        props = propsFactory.build({ fieldSets, onSave }),
        tester = await new Tester(ComponentClass, { props }).mount(),
        newValue = fakeTextShort();

      expect(tester.find(`[id="${field}"]`).exists()).toBe(true);
      await tester.submit();
      expect(JSON.stringify(onSave.mock.calls)).not.toContain(newValue);
      onSave.mockClear();

      await tester.changeInput(`[id="${field}"]`, newValue);
      await tester.submit();
      expect(JSON.stringify(onSave.mock.calls)).toContain(newValue);
    }),
  );
});
