import { asyncNoop } from './utilities';

export const formPropsDefaults = {
  onSave: asyncNoop,
  onSuccess: asyncNoop,
  saveText: 'Save',
};
