import { Tester } from '@mighty-justice/tester';
import { EMPTY_FIELD } from '@mighty-justice/utils';

import { Card, fillInFieldConfig, FormCard, IFieldConfig, TYPES } from '../../src';
import { TYPE_GENERATORS, valueRenderPairs } from '../factories';
import { IValue } from '../../src/props';

describe('Types', () => {
  it('Tests all types', async () => {
    expect(Object.keys(TYPE_GENERATORS)).toEqual(Object.keys(TYPES));
  });
});

Object.keys(TYPE_GENERATORS).forEach(type => {
  const { fieldConfigFactory } = TYPE_GENERATORS[type]
    , fieldConfig: IFieldConfig = fillInFieldConfig(fieldConfigFactory.build())
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

    it('Preserves state', async () => {
      const onSave = jest.fn()
        , props = { fieldSets, model, onSave };

      // Renders formatted value
      const tester = await new Tester(FormCard, { props }).mount();
      expect(onSave).not.toHaveBeenCalled();
      tester.submit();
      expect(onSave).toHaveBeenCalledWith(model);
    });

    it('Has correct empty values', async () => {
      const emptyValue = (() => {
          if (fieldConfig.type === 'checkbox') { return false; }
          return fieldConfig.nullify ? null : '';
        })()
        , onSave = jest.fn()
        , props = { fieldSets, onSave }
        , expectModel = { [fieldConfig.field]: emptyValue }
        ;

      const tester = await new Tester(FormCard, { props }).mount();
      expect(onSave).not.toHaveBeenCalled();
      tester.submit();
      expect(onSave).toHaveBeenCalledWith(expectModel);
    });

    it('Shows required asterisk', async () => {
      const onSave = jest.fn()
        , requiredFieldConfig = { ...fieldConfig, required: true }
        , props = { fieldSets: [[requiredFieldConfig]], model, onSave }
        , shouldShow = type !== 'hidden';

      const tester = await new Tester(FormCard, { props }).mount();
      expect(tester.find('.ant-form-item-required').exists()).toBe(shouldShow);
    });
  });
});
