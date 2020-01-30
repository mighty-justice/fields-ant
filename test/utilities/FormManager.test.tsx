import faker from 'faker';
import * as Antd from 'antd';

import { ERROR_WITH_DESCRIPTION } from '../../src/utilities/FormManager';
import { Tester } from '@mighty-justice/tester';

import { Form, FormCard, IFieldSetPartial } from '../../src';
import httpStatus from 'http-status-codes';
import { sleep } from '../factories';

async function getFormManager (fieldSets: IFieldSetPartial[], model = {}) {
  const props = {
    fieldSets,
    model,
    onSave: jest.fn(),
    title: 'Title',
  };

  const tester = await new Tester(FormCard, { props }).mount({ async: true });
  return tester.find('UnwrappedForm').instance().formManager;
}

describe('FormManager', () => {
  it('Correctly extracts field names', async () => {
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

  it('Correctly nullifies values', async () => {
    const fieldSets = [[
      { field: 'do_not_nullify' },
      { field: 'do_nullify', nullify: true },
    ]];

    const formManager = await getFormManager(fieldSets);
    expect(formManager.submitModel).toEqual({ do_not_nullify: '', do_nullify: null });
  });

  it('Correctly maintains id', async () => {
    const fieldSets = [[{ field: 'name' }]]
      , name = faker.name.firstName()
      , id = faker.random.uuid()
      , notId = faker.random.uuid();

    const formManager = await getFormManager(fieldSets, { id, name, notId });
    expect(formManager.submitModel).toEqual({ name, id });
  });

  it('Handles 500 responses', async () => {
    const fieldSets = [[{ field: 'name' }]]
      , name = faker.name.firstName()
      , id = faker.random.uuid()
      , notId = faker.random.uuid()
      , error: any = new Error()
      , badResponse = {
        config: {},
        data: '<!DOCTYPE html><html lang="en"><head /></html>',
        headers: {},
        status: 500,
        statusText: 'Internal Server Error',
      };

    error.response = badResponse;

    spyOn(Antd.notification, 'error');
    const formManager = await getFormManager(fieldSets, { id, name, notId });
    formManager.handleRequestError(error);
    expect(Antd.notification.error).toHaveBeenCalledWith({
       description: '500 - Server Error',
       duration: 3,
       message: 'Error submitting form',
    });
  });

  ERROR_WITH_DESCRIPTION.forEach(errorType => {
    it(`Shows descriptive error messages for error type ${errorType.toString()}`, async () => {
      const fieldSets = [[
          { field: 'field_1' },
          { field: 'field_2' },
        ]]
        , field1Error = faker.random.words()
        , nonFieldError = faker.random.words()
        , err = {
          response: {
            data: {
              field_1: [field1Error],
              non_field_errors: [nonFieldError],
            },
            status: errorType,
          },
        }
        , onSave = jest.fn(() => { throw err; })
        , props = { fieldSets, onSave }
        , tester = await new Tester(Form, { props }).mount()
        ;

      spyOn(Antd.notification, 'error');
      await tester.submit();

      expect(Antd.notification.error).toHaveBeenCalledWith({
        description: `Non Field Errors - ${nonFieldError}`,
        duration: 3,
        message: 'Error submitting form',
      });
    });
  });

  it('Can submit after backend validation fails', async () => {
    const fieldSets = [[
        { field: 'field_1' },
      ]]
      , THROW_BACKEND_ERROR = faker.random.words()
      , err = {
        response: {
          data: {
            field_1: [faker.random.words()],
          },
          status: httpStatus.BAD_REQUEST,
        },
      }
      , onSave = jest.fn((model) => {
        if (model.field_1 === THROW_BACKEND_ERROR) {
          throw err;
        }
      })
      , props = { fieldSets, onSave, model: { field_1: THROW_BACKEND_ERROR } }
      , tester = await new Tester(Form, { props }).mount({ async: true })
      , formManager = tester.find('UnwrappedForm').instance().formManager
      ;

    expect(formManager.submitButtonDisabled).toBe(false);
    await tester.submit();
    await sleep(3);
    expect(formManager.submitButtonDisabled).toBe(true);
    tester.changeInput('#field_1', '');
    expect(formManager.submitButtonDisabled).toBe(false);
  });
});
