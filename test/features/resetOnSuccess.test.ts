import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS } from '../factories';

describe('resetOnSuccess', () => {
  [true, false].forEach(resetOnSuccess => {
    it(`Handles resetOnSuccess=${resetOnSuccess ? 'true' : 'false'} correctly`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS.Form,
        onSave = jest.fn().mockResolvedValue({}),
        props = propsFactory.build({ onSave, fieldSets: [[{ field: 'field' }]], resetOnSuccess }),
        tester = await new Tester(ComponentClass, { props }).mount();

      expect(onSave).not.toHaveBeenCalled();

      await tester.submit();
      expect(onSave).toHaveBeenCalledWith({ field: '' });
      await tester.changeInput('#field', 'value');

      await tester.submit();
      expect(onSave).toHaveBeenCalledWith({ field: 'value' });

      await tester.submit();
      expect(onSave).toHaveBeenCalledWith({ field: resetOnSuccess ? '' : 'value' });
    });
  });
});
