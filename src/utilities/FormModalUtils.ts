import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';

import { ISharedFormModalProps } from '../props';

@autoBindMethods
class FormModalUtils {
  private props: ISharedFormModalProps;

  public constructor (props: ISharedFormModalProps) {
    this.props = props;
  }

  public get isVisible () {
    const { isVisible } = this.props;
    return isVisible ? isVisible.isTrue : true;
  }

  public get formProps () {
    const HANDLED_PROPS = ['title', 'isVisible', 'childrenBefore'];
    return omit(this.props, HANDLED_PROPS);
  }

  public onCancel () {
    const { onCancel, isVisible } = this.props;
    if (onCancel) { onCancel(); }
    if (isVisible && !onCancel) { isVisible.setFalse(); }
  }

  public async onSuccess () {
    const { onSuccess, isVisible } = this.props;
    if (onSuccess) { await onSuccess(); }
    if (isVisible && !onSuccess) { isVisible.setFalse(); }
  }
}

export default FormModalUtils;
