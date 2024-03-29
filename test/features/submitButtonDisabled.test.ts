import { act } from 'react-dom/test-utils';
import faker from 'faker';

import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS } from '../factories';

const SUPPORTING_COMPONENTS = ['Form', 'FormCard', 'FormDrawer', 'FormModal'];

const isSubmitDisabled = (tester: Tester): boolean => !!tester.find('.ant-btn-primary[disabled=true]').length,
  isSubmitLoading = (tester: Tester): boolean => !!tester.find('.ant-btn-loading').length,
  isInvalid = (tester: Tester): boolean => isSubmitDisabled(tester) && !isSubmitLoading(tester),
  isNotSubmitting = (tester: Tester): boolean =>
    // Not the same as !isSubmitting, since both have to be false
    !isSubmitDisabled(tester) && !isSubmitLoading(tester),
  clickSubmit = async (tester: Tester): Promise<void> => {
    await tester.refresh();
    expect(isSubmitDisabled(tester)).toBe(false);
    await tester.click(tester.find('.ant-btn-primary'));
  },
  changeInput = async (tester: Tester, value: any): Promise<void> => {
    await tester.changeInput('input', value);
  };

// Tests whether submit button correctly enables and disables.
describe('isSubmitButtonDisabled', () => {
  SUPPORTING_COMPONENTS.forEach(componentName => {
    it(`Submit button correctly disables in ${componentName}`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName],
        name = faker.lorem.sentence(),
        props = propsFactory.build({
          fieldSets: [[{ field: 'name', required: true }]],
          model: { name },
        });

      const tester = await new Tester(ComponentClass, { props });

      await act(async () => {
        await tester.mount();
      });

      expect(isInvalid(tester)).toBe(false);

      await act(async () => {
        await changeInput(tester, '');
        await tester.refresh();
      });

      expect(isInvalid(tester)).toBe(true);

      await changeInput(tester, name);
      await clickSubmit(tester);
      expect(isSubmitDisabled(tester)).toBe(false);
    });

    it(`Submit button correctly disables in nested forms on ${componentName}`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName],
        props = propsFactory.build({
          fieldSets: [[{ field: 'plaintiff.name' }]],
        });

      const tester = await new Tester(ComponentClass, { props }).mount();
      expect(isNotSubmitting(tester)).toBe(true);

      await changeInput(tester, 'Name');
      await clickSubmit(tester);
      expect(isSubmitDisabled(tester)).toBe(false);
    });
  });
});
