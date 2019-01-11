import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import * as Antd from 'antd';

import FormManager from '../utilities/FormManager';
import { ICardConfig } from '../interfaces';

import FormFields from '../building-blocks/FormFields';
import { fillInFieldSets } from '../utilities/common';
import { computed } from 'mobx';

interface IProps {
  cardConfig: ICardConfig;
  children?: any;
  close: () => void;
  defaults?: object;
  form: any;
  model?: any;
  onSave: (data: object) => Promise<void>;
  saveText?: string;
}

interface IPropDefaults extends IProps {
  saveText: string;
}

@autoBindMethods
@observer
class FormModal extends Component<IProps> {
  private formManager: FormManager;

  public static defaultProps: Partial<IProps> = {
    saveText: 'Save',
  };

  public get propsWithDefaults () {
    return this.props as IPropDefaults;
  }

  public constructor (props: IProps) {
    super(props);
    const { model, onSave, close } = props;

    this.formManager = new FormManager(
      props.form,
      this.fieldSets,
      {
        model,
        onSave,
        onSuccess: close,
      },
    );
  }

  @computed
  private get fieldSets () {
    return fillInFieldSets(this.props.cardConfig.fieldSets);
  }

  public render () {
    const { cardConfig, close, defaults, model, form } = this.props
      , { saveText } = this.propsWithDefaults;

    return (
      <Antd.Modal
        confirmLoading={this.formManager.saving}
        okText={this.formManager.saving ? 'Saving...' : saveText}
        onCancel={close}
        onOk={this.formManager.onSave}
        title={cardConfig.title}
        visible
      >
        <Antd.Form onSubmit={this.formManager.onSave} className='notes-form'>
          {this.fieldSets.map((fieldSet, idx) => (
            <div>
              <FormFields
                defaults={defaults}
                fieldSet={fieldSet}
                form={form}
                key={idx}
                model={model}
              />
            </div>
          ))}

          {this.props.children}
        </Antd.Form>
      </Antd.Modal>
    );
  }
}

const WrappedFormModal = Antd.Form.create()(FormModal);

export default WrappedFormModal;
