// tslint:disable max-classes-per-file
import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import { Button, Form as AntForm } from 'antd';
import { ButtonProps } from 'antd/es/button';
import { FormInstance } from 'antd/lib/form/hooks/useForm';

import ButtonToolbar from '../building-blocks/ButtonToolbar';
import FormFieldSet from '../building-blocks/FormFieldSet';
import { fillInFieldSets, filterFieldSets, formatClassNames, FormManager } from '../utilities';
import { formPropsDefaults, sharedComponentPropsDefaults } from '../propsDefaults';
import { ISharedFormProps, ISharedComponentProps } from '../props';
import { CLASS_PREFIX } from '../consts';

export interface IFormProps extends ISharedComponentProps, ISharedFormProps {
  showControls: boolean;
}

export interface IFormWrappedProps extends IFormProps {
  form: FormInstance;
}

const CLASS_NAME = `${CLASS_PREFIX}-form`,
  DEFAULT_PROPS = {
    ...formPropsDefaults,
    ...sharedComponentPropsDefaults,
    showControls: true,
  };

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
      return <Button block {...submitProps} />;
    }

    return (
      <ButtonToolbar align="right" noSpacing>
        {onCancel && (
          <Button disabled={this.formManager.isCancelButtonDisabled} onClick={onCancel} size="large">
            {cancelText}
          </Button>
        )}

        <Button {...submitProps} />
      </ButtonToolbar>
    );
  }

  public render() {
    const { showControls, title, layout, colon, form } = this.props,
      formModel = this.formManager.formModel,
      filteredFieldSets = filterFieldSets(this.fieldSets, { model: formModel }),
      className = cx(CLASS_NAME, this.props.className, formatClassNames(CLASS_NAME, colon, layout)),
      passDownProps = { layout, colon };

    return (
      <AntForm
        className={className}
        colon={colon}
        form={form}
        layout={layout}
        onFieldsChange={this.formManager.onFieldsChange}
        onFinish={this.formManager.onFinish}
      >
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
      </AntForm>
    );
  }
}

function Form(props: IFormProps) {
  const [form] = AntForm.useForm();
  return <UnwrappedForm {...props} form={form} />;
}

Form.defaultProps = DEFAULT_PROPS;

export default Form;
