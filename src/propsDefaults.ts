// istanbul ignore next
async function asyncNoop () {
  // istanbul ignore next
  return;
}

export const formPropsDefaults = {
  onSave: asyncNoop,
  saveText: 'Save',
};
