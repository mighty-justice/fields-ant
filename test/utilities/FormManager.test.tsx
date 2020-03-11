import faker from 'faker';
import httpStatus from 'http-status-codes';
import { set } from 'lodash';

import * as Antd from 'antd';

import { Tester } from '@mighty-justice/tester';

import { ERROR_WITH_DESCRIPTION } from '../../src/utilities/FormManager';
import { Form, FormCard, IFieldSetPartial } from '../../src';

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
    const field = 'field_1'
      , fieldSets = [[{ field }]]
      , THROW_BACKEND_ERROR = faker.random.words()
      , model = set({}, field, THROW_BACKEND_ERROR)
      , err = {
        response: {
          data: { [field]: [faker.random.words()] },
          status: httpStatus.BAD_REQUEST,
        },
      }
      , onSuccess = jest.fn()
      , onSave = jest.fn((submitModel) => {
        if (submitModel[field] === THROW_BACKEND_ERROR) {
          throw err;
        }
      })
      , props = { onSuccess, fieldSets, onSave, model }
      , tester = await new Tester(Form, { props }).mount({ async: true })
      , formManager = tester.find('UnwrappedForm').instance().formManager
      ;

    // Submit button should initially be enabled
    expect(formManager.isSubmitButtonDisabled).toBe(false);
    expect(formManager.formModel[field]).toBe(THROW_BACKEND_ERROR);

    await tester.submit();
    expect(onSave).toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();

    // Submit button should disable on backend validation error
    expect(formManager.isSubmitButtonDisabled).toBe(true);
    expect(formManager.formModel[field]).toBe(THROW_BACKEND_ERROR);

    // Submit button should re-enable on field change
    tester.changeInput(`input[id="${field}"]`, '');
    expect(formManager.isSubmitButtonDisabled).toBe(false);
    expect(formManager.formModel[field]).toBe('');

    await tester.submit();
    expect(onSuccess).toHaveBeenCalled();
  });

  it('Can handle backend errors on nested fields', async () => {
    const field = 'plaintiff.first_name'
      , fieldSets = [[{ field }]]
      , THROW_BACKEND_ERROR = faker.random.words()
      , model = set({}, field, THROW_BACKEND_ERROR)
      , err = {
        response: {
          data: { plaintiff: { first_name: [faker.random.words()] } },
          status: httpStatus.BAD_REQUEST,
        },
      }
      , onSuccess = jest.fn()
      , onSave = jest.fn((submitModel) => {
        if (submitModel.plaintiff.first_name === THROW_BACKEND_ERROR) {
          throw err;
        }
      })
      , props = { onSuccess, fieldSets, onSave, model }
      , tester = await new Tester(Form, { props }).mount({ async: true })
      , formManager = tester.find('UnwrappedForm').instance().formManager
      ;

    // Submit button should initially be enabled
    expect(formManager.isSubmitButtonDisabled).toBe(false);
    expect(formManager.formModel.plaintiff.first_name).toBe(THROW_BACKEND_ERROR);

    await tester.submit();
    expect(onSave).toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();

    // Submit button should disable on backend validation error
    expect(formManager.isSubmitButtonDisabled).toBe(true);
    expect(formManager.formModel.plaintiff.first_name).toBe(THROW_BACKEND_ERROR);

    // Submit button should re-enable on field change
    tester.changeInput(`input[id="${field}"]`, '');
    expect(formManager.isSubmitButtonDisabled).toBe(false);
    expect(formManager.formModel.plaintiff.first_name).toBe('');

    await tester.submit();
    expect(onSuccess).toHaveBeenCalled();
  });
});
