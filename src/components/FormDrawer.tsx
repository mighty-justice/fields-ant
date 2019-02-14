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
} from '../';

import { formPropsDefaults } from '../propsDefaults';
import { IFormProps, ISharedComponentProps, IWrappedFormProps } from '../props';

export interface IFormDrawerProps extends ISharedComponentProps, IFormProps {
  isVisible: SmartBool;
  width?: number | string;
}

export interface IFormDrawerWrappedProps extends IFormDrawerProps, IWrappedFormProps {}

@autoBindMethods
@observer
class UnwrappedFormDrawer extends Component<IFormDrawerWrappedProps> {
  private formManager: FormManager;

  public static defaultProps: Partial<IFormDrawerWrappedProps> = {
    ...formPropsDefaults,
  };

  @computed
  private get fieldSets () {
    return fillInFieldSets(this.props.fieldSets);
  }

  public constructor (props: IFormDrawerWrappedProps) {
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

const WrappedFormDrawer = Antd.Form.create()(UnwrappedFormDrawer);

@autoBindMethods
@observer
export class FormDrawer extends Component<IFormDrawerProps> {
  public static defaultProps: Partial<IFormDrawerProps> = {
    ...formPropsDefaults,
  };

  public render () {
    return <WrappedFormDrawer {...this.props} />;
  }
}

export default FormDrawer;
