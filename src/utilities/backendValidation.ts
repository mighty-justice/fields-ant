import { isArray, isPlainObject, extend } from 'lodash';

import { varToLabel } from '@mighty-justice/utils';

// Takes an API response and converts it to a string to string map
function getFieldErrors (errors: { [key: string]: any }, prefix = '') {
  const messages: { [key: string]: string } = {};
  Object.keys(errors).forEach(fieldName => {
    const fieldKey = [prefix, fieldName].filter(s => !!s).join('-');
    let fieldErrors = errors[fieldName];

    // If an array, use only the first element
    if (isArray(fieldErrors)) {
      fieldErrors = fieldErrors[0];
    }

    // If an object, recurse
    if (isPlainObject(fieldErrors)) {
      extend(messages, getFieldErrors(fieldErrors, fieldKey));
    }

    // If a simple string, you have your error
    else {
      messages[fieldKey] = fieldErrors;
    }
  });
  return messages;
}

export default function backendValidation (fieldNames: string[], response: object) {
  const fieldErrors = getFieldErrors(response)
    , foundOnForm: { [key: string]: string } = {}
    , errorMessages: Array<{ field: string, message: string }> = [];

  // Try to assign error fields to form fields, falling back on generic array
  Object.keys(fieldErrors).forEach(errorField => {
    const message = fieldErrors[errorField];

    // Check for an exact match
    if (fieldNames.includes(errorField)) {
      foundOnForm[errorField] = message;
      return;
    }

    // Check just the last attribute of the error
    if (errorField.includes('-')) {
      const errorFieldSuffix = errorField.split('-').pop();
      if (errorFieldSuffix && fieldNames.includes(errorFieldSuffix)) {
        foundOnForm[errorFieldSuffix] = message;
        return;
      }
    }

    // Check for a more fuzzy match of the entire string
    for (const fieldName of fieldNames) {
      const fieldNameFlat = fieldName.toLowerCase().replace(/[^a-z]/gi, '')
        , errorFieldFlat = errorField.toLowerCase().replace(/[^a-z]/gi, '');

      if (errorFieldFlat === fieldNameFlat) {
        foundOnForm[fieldName] = message;
        return;
      }
    }

    // With no form field found, add to generic array
    errorMessages.push({ field: varToLabel(errorField), message });
  });

  return { errorMessages, foundOnForm };
}
