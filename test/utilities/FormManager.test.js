/* global describe, it, expect */
import FormManager from '../../src/utilities/FormManager';
import {Tester} from '@mighty-justice/tester';
import {FormCard} from '../../src';

async function getFormManager (fieldSets) {
  const props = {
    fieldSets,
    model: {},
    onSave: jest.fn(),
    title: 'Title',
  };

  const tester = await new Tester(FormCard, { props }).mount();
  return tester.find('UnwrappedFormCard').instance().formManager;
}

describe('FormManager', () => {
  it(`Correctly extracts field names`, async () => {
    const fieldNames = [
      'case.plaintiff.first_name',
      'case.plaintiff.last_name',
      'case.attorney.first_name',
      'case.attorney.last_name',
      'case.type',
      'case.date_of_loss',
      'case.state_of_incident',
      'case.law_firm.name',
      'plaintiff_treatment_status',
    ];

    const formManager = await getFormManager([fieldNames.map(field => ({ field }))]);
    expect(formManager.formFieldNames).toEqual(fieldNames);
  });
});
