/* global describe, it, expect */
import faker from 'faker';
import * as Antd from 'antd';

import { Tester } from '@mighty-justice/tester';

import { FormCard, IFieldSetPartial } from '../../src';
import { toastError } from '../../src/utilities/FormManager';

async function getFormManager (fieldSets: IFieldSetPartial[], model = {}) {
  const props = {
    fieldSets,
    model,
    onSave: jest.fn(),
    title: 'Title',
  };

  const tester = await new Tester(FormCard, { props }).mount();
  return tester.find('UnwrappedForm').instance().formManager;
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

  it(`Correctly nullifies values`, async () => {
    const fieldSets = [[
      { field: 'do_not_nullify' },
      { field: 'do_nullify', nullify: true },
    ]];

    const formManager = await getFormManager(fieldSets);
    expect(formManager.formModel).toEqual({ do_not_nullify: '', do_nullify: null });
  });

  it(`Correctly maintains id`, async () => {
    const fieldSets = [[{ field: 'name' }]]
      , name = faker.name.firstName()
      , id = faker.random.uuid()
      , notId = faker.random.uuid();

    const formManager = await getFormManager(fieldSets, { id, name, notId });
    expect(formManager.formModel).toEqual({ name, id });
  });

  it(`Correctly maintains id`, async () => {
    const fieldSets = [[{ field: 'name' }]]
      , name = faker.name.firstName()
      , id = faker.random.uuid()
      , notId = faker.random.uuid();

    const formManager = await getFormManager(fieldSets, { id, name, notId });
    expect(formManager.formModel).toEqual({ name, id });
  });

  it(`Handles 500 responses`, async () => {
    const fieldSets = [[{ field: 'name' }]]
      , name = faker.name.firstName()
      , id = faker.random.uuid()
      , notId = faker.random.uuid()
      , response = {
        config: {},
        data: '<!DOCTYPE html><html lang="en"><head /></html>',
        headers: {},
        status: 500,
        statusText: 'Internal Server Error',
      };

    spyOn(Antd.notification, 'error');
    const formManager = await getFormManager(fieldSets, { id, name, notId });
    formManager.handleBackendResponse(response);
    expect(Antd.notification.error).toHaveBeenCalledWith(toastError);
  });
});
