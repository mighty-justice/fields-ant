import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';

import { Input, Form } from 'antd';

import { IAntFormField, IInjected, IFormFieldProps } from '../interfaces';

/*
Most components are automatically wrapped with a lot of boiler-plate form code
in FormItem.tsx. Components that want more control over this can pass
skipFieldDecorator and then use FormItem themselves. For hidden inputs, we want
almost no wrapping at all so the component doesn't render anything on the page.
To do this, we use skipFieldDecorator to opt out of boiler-plate then
fieldConfigProp to get some advanced props ( like fieldConfig ) so that we can
do some of what FormItem does for ourselves below:
*/

@autoBindMethods
@observer
class Hidden extends Component<IFormFieldProps> {
  private get injected() {
    return this.props as IInjected & IFormFieldProps & IAntFormField;
  }

  public render() {
    const {
        formManager,
        fieldConfig,
        fieldConfig: { field },
      } = this.injected,
      initialValue = formManager.getDefaultValue(fieldConfig),
      HANDLED_PROPS = ['formManager', 'formModel', 'fieldConfig'],
      inputProps = { ...omit(this.props, HANDLED_PROPS), type: 'hidden' };

    return (
      <Form.Item name={field.split('.')} initialValue={initialValue}>
        <Input {...inputProps} />
      </Form.Item>
    );
  }
}

export default Hidden;
