import { asyncNoop } from './utilities';

export const formPropsDefaults = {
  onSave: asyncNoop,
  saveText: 'Save',
};
