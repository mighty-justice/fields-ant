import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import autoBindMethods from 'class-autobind-decorator';
import { kebabCase } from 'lodash';
import { Tooltip } from 'antd';
import SmartBool from '@mighty-justice/smart-bool';

import ButtonToolbar from '../building-blocks/ButtonToolbar';
import GuardedButton from '../building-blocks/GuardedButton';
import { formPropsDefaults } from '../propsDefaults';
import { ISharedFormModalProps, ISharedFormProps } from '../props';

import Card, { ICardProps } from './Card';
import FormCard from './FormCard';
import FormDrawer from './FormDrawer';
import FormModal from './FormModal';
import { getBtnClassName } from '../utilities';

export interface IEditableCardProps extends ICardProps, ISharedFormProps {
  disabledDeleteTooltip?: string;
  disableDelete?: (model: unknown) => boolean;
  ModalComponent: new (props: ISharedFormModalProps) => FormModal | FormDrawer;
  onDelete?: (model: unknown) => Promise<any>;
}

@autoBindMethods
@observer
class EditableCard extends Component<IEditableCardProps> {
  @observable private isDeleting = new SmartBool();
  @observable private isEditing = new SmartBool();

  public static defaultProps: Partial<IEditableCardProps> = {
    ...formPropsDefaults,
    disabledDeleteTooltip: '',
    disableDelete: () => true,
  };

  private async handleDelete () {
    const { model, onDelete, onSuccess } = this.props;
    // istanbul ignore next
    if (!onDelete) { return; }

    this.isDeleting.set(true);
    try {
      await onDelete(model);
      if (onSuccess) { await onSuccess(); }
    }
    finally {
      this.isDeleting.set(false);
    }
  }

  private async handleSave (model: any) {
    const { onSuccess, onSave } = this.props;

    await onSave(model);
    if (onSuccess) { await onSuccess(); }
    this.isEditing.setFalse();
  }

  private get deleteButton () {
    const {
      classNameSuffix,
      disabledDeleteTooltip,
      disableDelete,
      isGuarded,
      isLoading,
      model,
      onDelete,
      title,
    } = this.props,
    className = getBtnClassName('delete', classNameSuffix, title),
    isDeleteDisabled = disableDelete && disableDelete(model);

    if (!onDelete) { return; }

    return (
      <Tooltip title={isDeleteDisabled ? disabledDeleteTooltip : ''}>
        <span>
          <GuardedButton
            className={className}
            confirm={true}
            disabled={isDeleteDisabled || isLoading || this.isDeleting.isTrue}
            icon='delete'
            isGuarded={isGuarded}
            onClick={this.handleDelete}
            size="small"
            type="danger"
          >
            Delete
          </GuardedButton>
        </span>
      </Tooltip>
    );
  }

  private get editButton () {
    const { isLoading, title, isGuarded } = this.props
      , classNameSuffix = this.props.classNameSuffix || kebabCase(title);

    return (
      <GuardedButton
        className={`btn-edit btn-edit-${classNameSuffix}`}
        disabled={isLoading || this.isEditing.isTrue || this.isDeleting.isTrue}
        icon='edit'
        isGuarded={isGuarded}
        onClick={this.isEditing.setTrue}
        size='small'
        type='primary'
      >
        Edit
      </GuardedButton>
    );
  }

  private buttons () {
    return (
      <ButtonToolbar noSpacing>
        {this.deleteButton}
        {this.editButton}
      </ButtonToolbar>
    );
  }

  public render () {
    const { ModalComponent } = this.props;

    if (this.isEditing.isTrue && !ModalComponent) {
      return (
        <FormCard
          {...this.props}
          onCancel={this.isEditing.setFalse}
          onSave={this.handleSave}
          renderTopRight={this.buttons}
        />
      );
    }

    return (
      <>
        {ModalComponent && (
          <ModalComponent
            {...this.props}
            isVisible={this.isEditing}
            onSave={this.handleSave}
          />
        )}
        <Card {...this.props} renderTopRight={this.buttons} />
      </>
    );
  }
}

export default EditableCard;
