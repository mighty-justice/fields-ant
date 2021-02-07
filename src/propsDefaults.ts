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
