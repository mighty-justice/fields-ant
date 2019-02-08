import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import SmartBool from '@mighty-justice/smart-bool';

import * as Antd from 'antd';

import {
  ButtonToolbar,
  fillInFieldSets,
  FormFieldSet,
  FormManager,
  IFieldSetPartial,
} from '../';

import { IForm } from '../props';

export interface IFormDrawerProps {
  defaults?: object;
  fieldSets: IFieldSetPartial[];
  form: IForm;
  isVisible: SmartBool;
  model?: any;
  onSave: (args: any) => Promise<void>;
  onSuccess?: (args?: any) => void;
  title: string;
  width?: number | string;
}

@autoBindMethods
@observer
class BaseFormDrawer extends Component<IFormDrawerProps> {
  private formManager: FormManager;

  @computed
  private get fieldSets () {
    return fillInFieldSets(this.props.fieldSets);
  }

  public constructor (props: IFormDrawerProps) {
    super(props);

    const {
      form,
      isVisible,
      model,
      onSave,
      onSuccess,
    } = props;

    this.formManager = new FormManager(
      form,
      this.fieldSets,
      {
        model,
        onSave,
        onSuccess: onSuccess || isVisible.setFalse,
      },
    );
  }

  public render () {
    const { form, isVisible, model, title, width, defaults } = this.props;

    return (
      <Antd.Drawer
        className='mfa-form-drawer'
        closable
        destroyOnClose
        maskClosable={false}
        onClose={isVisible.setFalse}
        placement='right'
        title={title}
        visible={isVisible.isTrue}
        width={width}
      >
        <Antd.Form layout='vertical' onSubmit={this.formManager.onSave}>
          {this.fieldSets.map((fieldSet, idx) => (
            <div key={idx}>
              <FormFieldSet
                defaults={defaults}
                fieldSet={fieldSet}
                form={form}
                formManager={this.formManager}
                model={model}
              />
            </div>
          ))}
          <Antd.Divider />

          <ButtonToolbar align='right'>
            <Antd.Button
              disabled={this.formManager.saving}
              onClick={isVisible.setFalse}
              size='large'
            >
              Cancel
            </Antd.Button>
            <Antd.Button
              htmlType='submit'
              loading={this.formManager.saving}
              size='large'
              type='primary'
            >
              Submit
            </Antd.Button>
          </ButtonToolbar>
        </Antd.Form>
      </Antd.Drawer>
    );
  }
}

const FormDrawer = Antd.Form.create()(BaseFormDrawer);

export default FormDrawer;
