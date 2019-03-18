import { Tester } from '@mighty-justice/tester';
import { EMPTY_FIELD } from '@mighty-justice/utils';

import { Card, fillInFieldConfig, FormCard, TYPES } from '../../src';
import { TYPE_GENERATORS, valueRenderPairs } from '../factories';

describe('Types', () => {
  it('Tests all types', async () => {
    expect(Object.keys(TYPE_GENERATORS)).toEqual(Object.keys(TYPES));
  });
});

Object.keys(TYPE_GENERATORS).forEach(type => {
  const { fieldConfigFactory } = TYPE_GENERATORS[type]
    , fieldConfig = fieldConfigFactory.build()
    , fieldSets = [[fieldConfig]]
    , [value, rendered] = valueRenderPairs[type]
    , model = { [fieldConfig.field]: value }
    ;

  describe(type, () => {
    it('Renders', async () => {
      const props = { fieldSets, model };

      // Renders empty placeholder
      const withoutData = await new Tester(Card, { props: { ...props, model: {} }}).mount();
      if (fillInFieldConfig(fieldConfig).writeOnly) {
        expect(withoutData.text()).not.toContain(EMPTY_FIELD);
        return;
      }
      if (rendered) { expect(withoutData.text()).not.toContain(rendered); }
      expect(withoutData.text()).toContain(EMPTY_FIELD);

      // Renders formatted value
      const withData = await new Tester(Card, { props }).mount();
      if (rendered) { expect(withData.text()).toContain(rendered); }
      expect(withData.text()).not.toContain(EMPTY_FIELD);
    });

    it('Edits', async () => {
      const onSave = jest.fn()
        , props = { fieldSets, model, onSave };

      // Renders formatted value
      const tester = await new Tester(FormCard, { props }).mount();
      expect(onSave).not.toHaveBeenCalled();
      tester.submit();
      expect(onSave).toHaveBeenCalledWith(model);
    });
  });
});
