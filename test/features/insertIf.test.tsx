import faker from 'faker';
import { Tester } from '@mighty-justice/tester';

import { FormManager } from '../../src/utilities';
import { EditableCard, CardField, FormField, Table } from '../../src';
import { fakeTextShort } from '../factories';

const title = 'testing'
  , field = 'example_field'
  , exampleField = faker.lorem.sentence()
  , exampleLabel = faker.lorem.sentence()
  , normalLabel = faker.lorem.sentence()
  , legend = faker.lorem.sentence()
  , normalField = { field: 'second_example_field', label: normalLabel }
  ;

describe('insertIf', () => {
  it('Shows if no insertIf attribute', async () => {
    const onSave = jest.fn().mockResolvedValue({})
     , tester = await new Tester(EditableCard, { props: {
        fieldSets: [{ fields: [{ field, label: exampleLabel }], legend }, [normalField]],
        model: { example_field: exampleField },
        onSave,
        title,
      }}).mount();

    // Should show everything
    expect(tester.text()).toContain(legend);
    expect(tester.text()).toContain(exampleLabel);
    expect(tester.text()).toContain(normalLabel);
    tester.click(`button.btn-edit`);
    expect(tester.text()).toContain(legend);
    expect(tester.text()).toContain(exampleLabel);
    expect(tester.text()).toContain(normalLabel);
  });

  it('Hides if insertIf returns false, separate fieldSets', async () => {
    const onSave = jest.fn().mockResolvedValue({})
      , insertIf = jest.fn(_values => false)
      , tester = await new Tester(EditableCard, { props: {
        fieldSets: [{ fields: [{ field, label: exampleLabel, insertIf }], legend }, [normalField]],
        model: { example_field: exampleField },
        onSave,
        title,
      }}).mount();

    // Should hide field and empty fieldset, but keep normal field
    expect(tester.text()).not.toContain(legend);
    expect(tester.text()).not.toContain(exampleLabel);
    expect(tester.text()).toContain(normalLabel);
    tester.click(`button.btn-edit`);
    expect(tester.text()).not.toContain(legend);
    expect(tester.text()).not.toContain(exampleLabel);
    expect(tester.text()).toContain(normalLabel);
  });

  it('Hides if insertIf returns false, same fieldSet', async () => {
    const onSave = jest.fn().mockResolvedValue({})
      , insertIf = jest.fn(_values => false)
      , tester = await new Tester(EditableCard, { props: {
        fieldSets: [{ fields: [{ field, label: exampleLabel, insertIf }, normalField], legend }],
        model: { example_field: exampleField },
        onSave,
        title,
      }}).mount();

    // Should hide field but not accidentally hide non-empty fieldset
    expect(tester.text()).toContain(legend);
    expect(tester.text()).not.toContain(exampleLabel);
    expect(tester.text()).toContain(normalLabel);
    tester.click(`button.btn-edit`);
    expect(tester.text()).toContain(legend);
    expect(tester.text()).not.toContain(exampleLabel);
    expect(tester.text()).toContain(normalLabel);
  });

  it('Shows if insertIf returns true', async () => {
    const onSave = jest.fn().mockResolvedValue({})
      , insertIf = jest.fn(_values => true)
      , tester = await new Tester(EditableCard, { props: {
        fieldSets: [{ fields: [{ field, label: exampleLabel, insertIf }], legend }, [normalField]],
        model: { example_field: exampleField },
        onSave,
        title,
      }}).mount();

    expect(tester.text()).toContain(legend);
    expect(tester.text()).toContain(exampleLabel);
    expect(tester.text()).toContain(normalLabel);
    tester.click(`button.btn-edit`);
    expect(tester.text()).toContain(legend);
    expect(tester.text()).toContain(exampleLabel);
    expect(tester.text()).toContain(normalLabel);
  });

  it('Works with individual CardFields', async () => {
    const hidden = await new Tester(CardField, { props: {
        fieldConfig: { field, label: exampleLabel, insertIf: jest.fn(_values => false) },
      }}).mount()
      , showing = await new Tester(CardField, { props: {
        fieldConfig: { field, label: exampleLabel, insertIf: jest.fn(_values => true) },
      }}).mount()
      , none = await new Tester(CardField, { props: {
        fieldConfig: { field, label: exampleLabel },
      }}).mount()
      ;

    expect(hidden.html()).toBe(null);
    expect(showing.text()).toContain(exampleLabel);
    expect(none.text()).toContain(exampleLabel);
  });

  it('Works with individual FormFields', async () => {
    const form = {
        getFieldDecorator: () => (x: any) => x,
        getFieldsValue: () => ({}),
      }
      , formManager = new FormManager({ props: { form }}, [], {})
      , props = { form, formManager }
      , hidden = await new Tester(FormField, { props: {
        ...props,
        fieldConfig: { field, label: exampleLabel, insertIf: jest.fn(_values => false) },
      }}).mount()
      , showing = await new Tester(FormField, { props: {
        ...props,
        fieldConfig: { field, label: exampleLabel, insertIf: jest.fn(_values => true) },
      }}).mount()
      , none = await new Tester(FormField, { props: {
        ...props,
        fieldConfig: { field, label: exampleLabel },
      }}).mount()
      ;

    expect(hidden.html()).toBe(null);
    expect(showing.html()).not.toBe(null);
    expect(none.html()).not.toBe(null);
  });

  it('Works with individual CardFields', async () => {
    const labelHidden = fakeTextShort()
      , labelShowing = fakeTextShort()
      , labelNone = fakeTextShort()
      , tester = await new Tester(Table, { props: {
        fieldSets: [[
          { type: 'string', field: 'hidden', label: labelHidden, insertIf: jest.fn(_values => false) },
          { type: 'string', field: 'showing', label: labelShowing, insertIf: jest.fn(_values => true) },
          { type: 'string', field: 'none', label: labelNone },
        ]],
        model: [],
      }}).mount()
      ;

    expect(tester.text()).not.toContain(labelHidden);
    expect(tester.text()).toContain(labelShowing);
    expect(tester.text()).toContain(labelNone);
  });

  it('Receives data from model', async () => {
    const insertIf = jest.fn(_values => !!(_values && _values.second_example_field))
      , fieldSets = [[
        { ...normalField, type: 'boolean' },
        { field, label: exampleLabel, insertIf, type: 'boolean' },
      ]]
      , props = { fieldSets, title }
      ;

    for (const secondExampleField of [true, false]) {
      const tester = await new Tester(EditableCard, { props: {
        ...props,
        model: { second_example_field: secondExampleField },
      }}).mount();

      expect(tester.text().includes(exampleLabel)).toBe(secondExampleField);
      tester.click(`button.btn-edit`);
      expect(tester.text().includes(exampleLabel)).toBe(secondExampleField);
    }
  });

  it('Receives data from defaults', async () => {
    const onSave = jest.fn().mockResolvedValue({})
      , insertIf = jest.fn(_values => !!(_values && _values.second_example_field))
      , fieldSets = [[
        { ...normalField, type: 'boolean' },
        { field, label: exampleLabel, insertIf, type: 'boolean' },
      ]]
      , props = { fieldSets, onSave, title }
      ;

    for (const secondExampleField of [true, false]) {
      const tester = await new Tester(EditableCard, { props: {
        ...props,
        defaults: { second_example_field: secondExampleField },
      }}).mount();

      tester.click(`button.btn-edit`);
      expect(tester.text().includes(exampleLabel)).toBe(secondExampleField);
    }
  });

  it('Does not pass removed field on save', async () => {
    const onSave = jest.fn().mockResolvedValue({})
      , tester = await new Tester(EditableCard, { props: {
        fieldSets: [[{ field, insertIf: jest.fn(_values => false) }]],
        onSave,
      }}).mount();
    tester.click('button.btn-edit');
    tester.submit();

    expect(onSave).not.toHaveBeenCalledWith(expect.objectContaining({[field]: ''}));
  });
});
