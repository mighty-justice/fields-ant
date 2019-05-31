import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';

import { ISharedFormModalProps } from '../props';
import { Component } from 'react';

@autoBindMethods
class FormModalUtils {
  private ref: Component<ISharedFormModalProps>;
  public constructor (ref: Component<ISharedFormModalProps>) {
    this.ref = ref;
  }

  public get isVisible () {
    const { isVisible } = this.ref.props;
    return isVisible ? isVisible.isTrue : true;
  }

  public get formProps () {
    const HANDLED_PROPS = ['title', 'isVisible', 'childrenBefore'];
    return omit(this.ref.props, HANDLED_PROPS);
  }

  public onCancel () {
    const { onCancel, isVisible } = this.ref.props;
    if (onCancel) { onCancel(); }
    if (isVisible && !onCancel) { isVisible.setFalse(); }
  }

  public async onSuccess () {
    const { onSuccess, isVisible } = this.ref.props;
    if (onSuccess) { await onSuccess(); }
    if (isVisible && !onSuccess) { isVisible.setFalse(); }
  }
}

export default FormModalUtils;
