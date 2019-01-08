import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import SmartBool from '@mighty-justice/smart-bool';

import { Button, Divider, Drawer, Form } from 'antd';

import {
  FormFields,
  FormManager,
  getFieldSetFields,
  IFieldSet,
  ButtonToolbar,
} from '../';

interface IProps {
  fieldSets: IFieldSet[];
  form: any;
  isVisible: SmartBool;
  model?: any;
  onSave: (args: any) => Promise<void>;
  onSuccess?: (args?: any) => void;
  title: string;
}

const DRAWER_WIDTH = 420;

@autoBindMethods
@observer
class BaseFormDrawer extends Component<IProps> {
  private formManager: FormManager;

  public constructor (props: IProps) {
    super(props);

    const {
      fieldSets,
      form,
      isVisible,
      model,
      onSave,
      onSuccess,
    } = props;

    this.formManager = new FormManager(
      form,
      fieldSets,
      {
        model,
        onSave,
        onSuccess: onSuccess || isVisible.setFalse,
      },
    );
  }

  public render () {
    const { fieldSets, form, isVisible, model, title } = this.props;

    return (
      <Drawer
        closable
        destroyOnClose
        maskClosable={false}
        onClose={isVisible.setFalse}
        placement='right'
        title={title}
        visible={isVisible.isTrue}
        width={DRAWER_WIDTH}
      >
        <Form layout='vertical' hideRequiredMark onSubmit={this.formManager.onSave}>
          <FormFields fields={getFieldSetFields(fieldSets[0])} form={form} model={model} />
          <Divider />
          <ButtonToolbar align='right'>
            <Button disabled={this.formManager.saving} onClick={isVisible.setFalse} size='large'>Cancel</Button>
            <Button loading={this.formManager.saving} type='primary' htmlType='submit' size='large'>Submit</Button>
          </ButtonToolbar>
        </Form>
      </Drawer>
    );
  }
}

const FormDrawer = Form.create()(BaseFormDrawer);

export default FormDrawer;
