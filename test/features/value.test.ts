import { Tester } from '@mighty-justice/tester';
import { EMPTY_FIELD } from '@mighty-justice/utils';

import { Card, FormCard } from '../../src';
import { TYPE_GENERATORS, valueRenderPairs } from '../factories';

Object.keys(TYPE_GENERATORS).forEach(type => {
  const { fieldConfigFactory } = TYPE_GENERATORS[type],
    [value, rendered] = valueRenderPairs[type],
    fieldConfig = fieldConfigFactory.build({ value }),
    fieldSets = [[fieldConfig]];

  describe(type, () => {
    it('Renders', async () => {
      const props = { fieldSets },
        tester = await new Tester(Card, { props }).mount();

      if (rendered) {
        expect(tester.text()).toContain(rendered);
      }
      expect(tester.text()).not.toContain(EMPTY_FIELD);
    });

    it('Edits', async () => {
      const onSave = jest.fn(),
        props = { fieldSets, onSave },
        ignoreTest = type === 'address';

      if (ignoreTest) {
        return;
      }

      const tester = await new Tester(FormCard, { props }).mount();
      expect(onSave).not.toHaveBeenCalled();
      await tester.submit();
      expect(onSave).toHaveBeenCalledWith({ [fieldConfig.field]: value });
    });
  });
});
