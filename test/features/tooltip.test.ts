import { Tester } from '@mighty-justice/tester';

import { EditableCard } from '../../src';
import { fakeField, fakeTextShort } from '../factories';

describe('tooltip', () => {
  it('Respects tooltip attribute in fieldConfig', async () => {
    const label = fakeTextShort(),
      tooltip = fakeTextShort(),
      tester = await new Tester(EditableCard, {
        props: {
          fieldSets: [[{ field: 'example_field', label, tooltip }]],
          model: { example_field: fakeField() },
          onSave: jest.fn().mockResolvedValue({}),
          title: 'testing',
        },
      }).mount();

    expect(tester.text()).toContain(label);
    expect(tester.html()).toContain('question-circle');
    expect(tester.find('input').length).toBe(0);
    expect(tester.find('Tooltip').length).not.toBe(0);

    tester.click('button.btn-edit');
    await tester.refresh();

    expect(tester.text()).toContain(label);
    expect(tester.html()).toContain('question-circle');
    expect(tester.find('input').length).not.toBe(0);
    expect(tester.find('Tooltip').length).not.toBe(0);
  });

  it('Respects tooltip attribute in complex fieldSet', async () => {
    const label = fakeTextShort(),
      tooltip = fakeTextShort(),
      tester = await new Tester(EditableCard, {
        props: {
          fieldSets: [
            {
              fields: [{ field: 'example_field', label }],
              legend: fakeTextShort(),
              tooltip,
            },
          ],
          model: { example_field: fakeField() },
          onSave: jest.fn().mockResolvedValue({}),
          title: 'testing',
        },
      }).mount();

    expect(tester.text()).toContain(label);
    expect(tester.html()).toContain('question-circle');
    expect(tester.find('input').length).toBe(0);
    expect(tester.find('Tooltip').length).not.toBe(0);

    tester.click('button.btn-edit');
    await tester.refresh();

    expect(tester.text()).toContain(label);
    expect(tester.html()).toContain('question-circle');
    expect(tester.find('input').length).not.toBe(0);
    expect(tester.find('Tooltip').length).not.toBe(0);
  });
});
