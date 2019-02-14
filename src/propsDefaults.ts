import { noop } from 'lodash';
import { asyncNoop } from './utilities/common';

export const formPropsDefaults = {
  onCancel: noop,
  onSave: asyncNoop,
  onSuccess: asyncNoop,
  saveText: 'Save',
};
