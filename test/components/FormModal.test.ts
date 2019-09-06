import faker from 'faker';

import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS } from '../factories';
import SmartBool from '@mighty-justice/smart-bool';

[
  {
    name: 'FormModal',
  },
  {
    name: 'FormDrawer',
  },
].forEach(({ name }) => {
  describe(name, () => {
    it('Renders', async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[name]
        , exampleValue = faker.lorem.sentence()
        , title = faker.lorem.sentence()
        , props = {
          ...propsFactory.build(),
          fieldSets: [[{ field: 'exampleField' }]],
          model: { exampleField: exampleValue },
          title,
        };

      const tester = await new Tester(ComponentClass, { props }).mount();
      expect(tester.text()).toContain(title);
      expect(tester.text()).toContain('Example Field');
      expect(tester.html()).toContain(exampleValue);
    });

    it('Renders children', async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[name]
        , textChildren = faker.lorem.sentence()
        , textChildrenBefore = faker.lorem.sentence()
        , props = {
          ...propsFactory.build(),
          children: textChildren,
          childrenBefore: textChildrenBefore,
        };

      const tester = await new Tester(ComponentClass, { props }).mount();
      expect(tester.text()).toContain(textChildren);
      expect(tester.text()).toContain(textChildrenBefore);
    });

    it('Works with isVisible', async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[name]
        , title = faker.lorem.sentence()
        , isVisible = new SmartBool(false)
        , props = {
          ...propsFactory.build(),
          isVisible,
          title,
        };

      const tester = await new Tester(ComponentClass, { props }).mount({});

      // Open modal using isVisible
      expect(tester.text()).toBe('');
      isVisible.setTrue();
      await tester.refresh();
      expect(tester.text()).toContain(title);

      // Check that it auto-closes on successful submit
      await tester.refresh();
      await tester.submit();
      expect(isVisible.isTrue).toBe(false);

      // Re-open and test cancel button
      isVisible.setTrue();
      await tester.refresh();
      tester.click('button > span[children="Cancel"]');
      expect(isVisible.isTrue).toBe(false);
    });

    it('Works with onSuccess and onCancel', async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[name]
        , title = faker.lorem.sentence()
        , onCancel = jest.fn()
        , onSuccess = jest.fn()
        , isVisible = new SmartBool(true)
        , props = {
          ...propsFactory.build(),
          isVisible,
          onCancel,
          onSuccess,
          title,
        };

      const tester = await new Tester(ComponentClass, { props }).mount();
      expect(onCancel).not.toHaveBeenCalled();
      expect(onSuccess).not.toHaveBeenCalled();

      // Test submit button
      onCancel.mockClear();
      onSuccess.mockClear();
      await tester.submit();
      expect(onCancel).not.toHaveBeenCalled();
      expect(onSuccess).toHaveBeenCalled();
      expect(isVisible.isTrue).toBe(true);

      // Test cancel button
      onCancel.mockClear();
      onSuccess.mockClear();
      tester.click('button > span[children="Cancel"]');
      expect(onCancel).toHaveBeenCalled();
      expect(onSuccess).not.toHaveBeenCalled();
      expect(isVisible.isTrue).toBe(true);
    });
  });
});
