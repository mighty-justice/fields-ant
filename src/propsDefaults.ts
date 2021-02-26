import { ILayout } from './interfaces';

// istanbul ignore next
async function asyncNoop() {
  // istanbul ignore next
  return;
}

export const formPropsDefaults = {
  cancelText: 'Cancel',
  onSave: asyncNoop,
  saveText: 'Save',
};

export const sharedComponentPropsDefaults: { layout?: ILayout; colon: boolean } = {
  layout: 'vertical',
  colon: false,
};
