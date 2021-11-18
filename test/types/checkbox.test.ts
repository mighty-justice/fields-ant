import { Tester } from '@mighty-justice/tester';

import { TYPE_GENERATORS } from '../factories';

import { FormCard } from '../../src';
import { IFormCardProps } from '../../src/components/FormCard';

const { fieldConfigFactory } = TYPE_GENERATORS.checkbox,
  fieldConfig = fieldConfigFactory.build(),
  fieldSets = [[fieldConfig]];

describe('checkbox', () => {
  it('resets on submit', async () => {
    const onSave = jest.fn(),
      props: Partial<IFormCardProps> = { fieldSets, onSave };

    const tester = await new Tester(FormCard, { props }).mount();

    async function submitAndCheckFor(value: boolean) {
      expect(onSave).not.toHaveBeenCalled();
      await tester.refresh();
      expect(tester.find('.ant-checkbox-wrapper-checked').length).toBe(value ? 1 : 0);

      await tester.submit();

      expect(onSave).toHaveBeenCalledWith({ [fieldConfig.field]: value });
      expect(tester.html()).toContain('value=""');
      expect(tester.find('.ant-checkbox-wrapper-checked').length).toBe(0);

      onSave.mockClear();
    }

    // Submit without changing
    await submitAndCheckFor(false);

    // Change and submit
    await tester.checkBox('input', true);
    await submitAndCheckFor(true);

    // Submit again
    await submitAndCheckFor(false);
  });
});
