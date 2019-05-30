import httpStatus from 'http-status-codes';
import * as Antd from 'antd';

import { Tester } from '@mighty-justice/tester';

import { fakeTextShort } from '../factories';
import { Form } from '../../src';

describe('processErrors', () => {
  it('Can change, add, or omit error messages ', async () => {
    const fieldSets = [[
        { field: 'field_1' },
        { field: 'field_2' },
      ]]
      , field1Error = fakeTextShort()
      , newField2Error = fakeTextShort()
      , nonFieldError = fakeTextShort()
      , newNonFieldError = fakeTextShort()
      , error = {
        response: {
          data: {
            field_1: [field1Error],
            non_field_errors: [nonFieldError],
          },
          status: httpStatus.BAD_REQUEST,
        },
      }
      , onSave = jest.fn(() => { throw error; })
      , processErrors = jest.fn(({ foundOnForm }) => ({
        errorMessages: [{ field: 'Non Field Errors', message: newNonFieldError }],
        foundOnForm: { ...foundOnForm, field_2: newField2Error },
      }))
      , props = { fieldSets, onSave, processErrors }
      , tester = await new Tester(Form, { props }).mount()
      ;

    spyOn(Antd.notification, 'error');
    await tester.submit();
    expect(processErrors).toHaveBeenCalledWith({
      errorMessages: [{
        field: 'Non Field Errors',
        message: nonFieldError,
      }],
      foundOnForm: { field_1: field1Error },
    });

    // Keep some errors
    expect(tester.text()).toContain(field1Error);

    // Add new errors
    expect(tester.text()).toContain(newField2Error);

    // Modify existing errors
    expect(Antd.notification.error).toHaveBeenCalledWith({
      description: `Non Field Errors - ${newNonFieldError}`,
      duration: null,
      message: 'Error submitting form',
    });
  });
});