// tslint:disable max-classes-per-file
import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import * as Antd from 'antd';
import { ButtonProps } from 'antd/es/button';
import { FormComponentProps } from 'antd/es/form';

import ButtonToolbar from '../building-blocks/ButtonToolbar';
import FormFieldSet from '../building-blocks/FormFieldSet';
import { fillInFieldSets, filterFieldSets, FormManager } from '../utilities';
import { formPropsDefaults, sharedComponentPropsDefaults } from '../propsDefaults';
import { ISharedFormProps, ISharedComponentProps } from '../props';
import { CLASS_PREFIX } from '../consts';

export interface IFormProps extends ISharedComponentProps, ISharedFormProps {
  setRefFormManager?: (formManager: FormManager) => void;
  showControls: boolean;
}

export interface IFormWrappedProps extends IFormProps, FormComponentProps {}

const CLASS_NAME = `${CLASS_PREFIX}-form`;

@autoBindMethods
@observer
export class UnwrappedForm extends Component<IFormWrappedProps> {
  private formManager: FormManager;

  public constructor(props: IFormWrappedProps) {
    super(props);
    const { defaults, model, onSave, processErrors, resetOnSuccess, setRefFormManager, successText } = props;

    this.formManager = new FormManager(this, this.fieldSets, {
      defaults,
      model,
      onSave,
      onSuccess: this.onSuccess,
      processErrors,
      resetOnSuccess,
      successText,
    });

    if (setRefFormManager) {
      setRefFormManager(this.formManager);
    }
  }

  private async onSuccess() {
    const { onSuccess } = this.props;
    if (onSuccess) {
      await onSuccess();
    }
  }

  @computed
  private get fieldSets() {
    return fillInFieldSets(this.props.fieldSets);
  }

  private renderControls() {
    const { blockSubmit, cancelText, onCancel, saveText } = this.props,
      { isSaving, isSubmitButtonDisabled } = this.formManager,
      submitProps: ButtonProps = {
        children: isSaving ? 'Saving...' : saveText,
        disabled: isSubmitButtonDisabled,
        htmlType: 'submit',
        loading: isSaving,
        size: 'large',
        type: 'primary',
      };

    if (blockSubmit) {
      return <Antd.Button block {...submitProps} />;
    }

    return (
      <ButtonToolbar align="right" noSpacing>
        {onCancel && (
          <Antd.Button disabled={this.formManager.isCancelButtonDisabled} onClick={onCancel} size="large">
            {cancelText}
          </Antd.Button>
        )}

        <Antd.Button {...submitProps} />
      </ButtonToolbar>
    );
  }

  public render() {
    const { showControls, title, layout, colon } = this.props,
      formModel = this.formManager.formModel,
      filteredFieldSets = filterFieldSets(this.fieldSets, { model: formModel }),
      hasColon = !(colon === false || layout === 'vertical'),
      className = cx(CLASS_NAME, this.props.className, `${CLASS_NAME}${hasColon ? '' : '-no'}-colon`),
      passDownProps = { layout: layout };

    return (
      <Antd.Form className={className} colon={colon} layout={layout} onSubmit={this.formManager.onSave}>
        {title && <h2>{title}</h2>}

        {filteredFieldSets.map((fieldSet, idx) => (
          <FormFieldSet
            fieldSet={fieldSet}
            formManager={this.formManager}
            formModel={formModel}
            key={idx}
            {...passDownProps}
          />
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
    ...sharedComponentPropsDefaults,
    showControls: true,
  };

  public render() {
    return <WrappedForm {...this.props} />;
  }
}

export default Form;
