import { Tester } from '@mighty-justice/tester';

import { EditableCard } from '../../src';
import { fakeField, fakeTextShort } from '../factories';

describe('tooltip', () => {
  it('Respects tooltip attribute', async () => {
    const label = fakeTextShort()
      , tooltip = fakeTextShort()
      ;

    const tester = await new Tester(EditableCard, { props: {
      fieldSets: [[{ field: 'example_field', label, tooltip }]],
      model: { example_field: fakeField() },
      onSave: jest.fn().mockResolvedValue({}),
      title: 'testing',
    }}).mount();

    expect(tester.html()).toContain('question-circle-o');
    expect(tester.find('input').length > 0).toBe(false);
    expect(tester.find('Tooltip').length > 0).toBe(true);

    tester.find(`button.btn-edit`).simulate('click');
    await tester.refresh();

    expect(tester.html()).toContain('question-circle-o');
    expect(tester.find('input').length > 0).toBe(true);
    expect(tester.find('Tooltip').length > 0).toBe(true);
  });
});
