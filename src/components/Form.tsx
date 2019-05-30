// tslint:disable max-classes-per-file
import React, { Component, Fragment } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import * as Antd from 'antd';
import { ButtonProps } from 'antd/lib/button';

import ButtonToolbar from '../building-blocks/ButtonToolbar';
import FormFieldSet from '../building-blocks/FormFieldSet';
import {
  fillInFieldSets,
  filterFieldSets,
  FormManager,
} from '../utilities';
import { formPropsDefaults } from '../propsDefaults';
import { IFieldSet } from '../interfaces';
import { ISharedFormProps, ISharedComponentProps, IWrappedFormProps } from '../props';

export interface IFormProps extends ISharedComponentProps, ISharedFormProps {
  setRefFormManager?: (formManager: FormManager) => void;
  showControls: boolean;
}

export interface IFormWrappedProps extends IFormProps, IWrappedFormProps {}

@autoBindMethods
@observer
export class UnwrappedForm extends Component<IFormWrappedProps> {
  private formManager: FormManager;

  public constructor (props: IFormWrappedProps) {
    super(props);
    const {
      defaults,
      model,
      onSave,
      processErrors,
      resetOnSuccess,
      setRefFormManager,
      successText,
    } = props;

    this.formManager = new FormManager(
      this,
      this.fieldSets,
      {
        defaults,
        model,
        onSave,
        onSuccess: this.onSuccess,
        processErrors,
        resetOnSuccess,
        successText,
      },
    );

    if (setRefFormManager) {
      setRefFormManager(this.formManager);
    }
  }

  private async onSuccess () {
    const { onSuccess } = this.props;
    if (onSuccess) { await onSuccess(); }
  }

  @computed
  private get fieldSets () {
    return fillInFieldSets(this.props.fieldSets);
  }

  private hasErrors (fieldsError: any) {
    return Object.keys(fieldsError).some((field) => fieldsError[field]);
  }

  private renderControls () {
    const {
        blockSubmit,
        onCancel,
        saveText,
      } = this.props
      , submitProps: ButtonProps = {
        children: saveText,
        disabled: this.formManager.submitButtonDisabled,
        htmlType: 'submit',
        loading: this.formManager.saving,
        size: 'large',
        type: 'primary',
      };

    if (blockSubmit) {
      return <Antd.Button block {...submitProps}/>;
    }

    return (
      <ButtonToolbar align='right' noSpacing>
        {onCancel && (
          <Antd.Button
            disabled={this.formManager.saving}
            onClick={onCancel}
            size='large'
          >
            Cancel
          </Antd.Button>
        )}

        <Antd.Button {...submitProps}/>
      </ButtonToolbar>
    );
  }

  public render () {
    const { showControls, title } = this.props
      , formModel = this.formManager.formModel
      , filteredFieldSets = filterFieldSets(this.fieldSets, { model: formModel });

    return (
      <Antd.Form layout='vertical' onSubmit={this.formManager.onSave} className='mfa-form'>
        {title && <h2>{title}</h2>}

        {filteredFieldSets.map((fieldSet: IFieldSet, idx: number) => (
          <Fragment key={idx}>
            {(idx > 0) && <Antd.Divider key={`divider-${idx}`} />}

            <div>
              <FormFieldSet
                fieldSet={fieldSet}
                formManager={this.formManager}
                formModel={formModel}
              />
            </div>
          </Fragment>
        ))}

        {this.props.children}

        {showControls && this.renderControls()}
      </Antd.Form>
    );
  }
}

// istanbul ignore next
const WrappedForm = Antd.Form.create()(UnwrappedForm);

@autoBindMethods
@observer
export class Form extends Component<IFormProps> {
  public static defaultProps: Partial<IFormWrappedProps> = {
    ...formPropsDefaults,
    showControls: true,
  };

  public render () {
    return <WrappedForm {...this.props} />;
  }
}

export default Form;
