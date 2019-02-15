import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import autoBindMethods from 'class-autobind-decorator';
import { kebabCase } from 'lodash';

import SmartBool from '@mighty-justice/smart-bool';

import ButtonToolbar from '../building-blocks/ButtonToolbar';
import GuardedButton from '../building-blocks/GuardedButton';
import { formPropsDefaults } from '../propsDefaults';
import { ISharedFormProps } from '../props';

import Card, { ICardProps } from './Card';
import FormCard from './FormCard';

export interface IEditableCardProps extends ICardProps, ISharedFormProps {
  onDelete?: (model: unknown) => Promise<any>;
}

@autoBindMethods
@observer
class EditableCard extends Component<IEditableCardProps> {
  @observable private isDeleting = new SmartBool();
  @observable private isEditing = new SmartBool();

  public static defaultProps: Partial<IEditableCardProps> = {
    ...formPropsDefaults,
  };

  private async handleDelete () {
    const { model, onDelete, onSuccess } = this.props;
    // istanbul ignore next
    if (!onDelete) { return; }

    this.isDeleting.set(true);
    await onDelete(model);
    await onSuccess();
    this.isDeleting.set(false);
  }

  private async handleSave (model: any) {
    const { onSuccess, onSave } = this.props;

    await onSave(model);
    await onSuccess();
  }

  private get deleteButton () {
    const { isGuarded, title, onDelete, isLoading } = this.props
      , classNameSuffix = this.props.classNameSuffix || kebabCase(title);

    if (!onDelete) { return; }

    return (
      <GuardedButton
        className={`btn-delete btn-delete-${classNameSuffix}`}
        confirm={true}
        disabled={isLoading || this.isDeleting.isTrue}
        icon='delete'
        isGuarded={isGuarded}
        onClick={this.handleDelete}
        size='small'
        type='danger'
      >
        Delete
      </GuardedButton>
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
      <ButtonToolbar>
        {this.deleteButton}
        {this.editButton}
      </ButtonToolbar>
    );
  }

  public render () {
    if (this.isEditing.isTrue) {
      return (
        <FormCard
          {...this.props}
          onCancel={this.isEditing.setFalse}
          onSave={this.handleSave}
          renderTopRight={this.buttons}
        />
      );
    }

    return <Card {...this.props} renderTopRight={this.buttons} />;
  }
}

export default EditableCard;
