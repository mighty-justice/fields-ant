import faker from 'faker';
import { Tester } from '@mighty-justice/tester';

import { EditableCard } from '../../src';

describe('noLabel', () => {
  it('Respects noLabel attribute', async () => {
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
    withoutNoLabel.find(`button.btn-edit`).simulate('click');
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
    withNoLabel.find(`button.btn-edit`).simulate('click');
    expect(withNoLabel.text()).not.toContain(label);
  });
});
