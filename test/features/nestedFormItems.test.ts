import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS } from '../factories';

describe('NestedFormItems', () => {
  it('Saves correct values', async () => {
    const { ComponentClass, propsFactory } = COMPONENT_GENERATORS.Form,
      onSave = jest.fn().mockResolvedValue({}),
      props = propsFactory.build({ onSave, fieldSets: [[{ field: 'test[0].note', type: 'string' }]] }),
      tester = await new Tester(ComponentClass, { props }).mount();

    expect(onSave).not.toHaveBeenCalled();

    await tester.submit();
    expect(onSave).toHaveBeenCalledWith({ test: [{ note: '' }] });

    await tester.changeInput('input[id="test[0].note"]', 'asdf');
    await tester.submit();
    expect(onSave).toHaveBeenCalledWith({ test: [{ note: 'asdf' }] });

    await tester.submit();
    expect(onSave).toHaveBeenCalledWith({ test: [{ note: '' }] });
  });
});
