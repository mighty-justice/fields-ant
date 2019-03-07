import { asyncNoop } from './utilities/common';

export const formPropsDefaults = {
  onSave: asyncNoop,
  onSuccess: asyncNoop,
  saveText: 'Save',
};
