import faker from 'faker';
import { Tester } from '@mighty-justice/tester';

import { EditableCard } from '../../src';

describe('noLabel', () => {
  it('Respects showLabel attribute', async () => {
    const label = faker.lorem.sentence(),
      exampleField = faker.lorem.sentence(),
      title = 'testing',
      onSave = jest.fn().mockResolvedValue({});

    const withoutNoLabel = await new Tester(EditableCard, {
      props: {
        fieldSets: [[{ field: 'example_field', label }]],
        model: { example_field: exampleField },
        onSave,
        title,
      },
    }).mount();
    expect(withoutNoLabel.text()).toContain(label);
    withoutNoLabel.click('button.btn-edit');
    expect(withoutNoLabel.text()).toContain(label);

    const withNoLabel = await new Tester(EditableCard, {
      props: {
        fieldSets: [[{ field: 'example_field', label, showLabel: false }]],
        model: { example_field: exampleField },
        onSave,
        title,
      },
    }).mount();
    expect(withNoLabel.text()).not.toContain(label);
    withNoLabel.click('button.btn-edit');
    expect(withNoLabel.text()).not.toContain(label);
  });
});
