import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { isEmpty } from 'lodash';
import autoBindMethods from 'class-autobind-decorator';
import SmartBool from '@mighty-justice/smart-bool';

import * as Antd from 'antd';

import GuardedButton from '../building-blocks/GuardedButton';
import { formPropsDefaults } from '../propsDefaults';
import { getBtnClassName } from '../utilities';
import { ISharedFormProps } from '../props';

import EditableCard from './EditableCard';
import FormCard from './FormCard';
import { IArrayCardProps } from './ArrayCard';

export interface IEditableArrayCardProps extends IArrayCardProps, ISharedFormProps {
  defaults?: object;
  onCreate: (model: unknown) => Promise<any>;
  onDelete?: (model: unknown) => Promise<any>;
}

@autoBindMethods
@observer
class EditableArrayCard extends Component<IEditableArrayCardProps> {
  @observable private isAddingNew = new SmartBool();

  public static defaultProps: Partial<IEditableArrayCardProps> = {
    ...formPropsDefaults,
  };

  private async handleSaveNew(model: any) {
    const { onCreate, onSuccess } = this.props;
    await onCreate(model);
    if (onSuccess) {
      await onSuccess();
    }
    this.isAddingNew.setFalse();
  }

  private renderAddNew() {
    const { isLoading, isGuarded, classNameSuffix, title } = this.props,
      className = getBtnClassName('new', classNameSuffix, title);

    return (
      <GuardedButton
        className={className}
        disabled={isLoading || this.isAddingNew.isTrue}
        icon="plus"
        isGuarded={isGuarded}
        onClick={this.isAddingNew.setTrue}
        size="small"
        type="primary"
      >
        Add
      </GuardedButton>
    );
  }

  public render() {
    const { classNameSuffix, defaults, fieldSets, isLoading, model, onDelete, onSave, onSuccess, title } = this.props;

    return (
      <Antd.Card title={title} extra={this.renderAddNew()} loading={isLoading}>
        {this.isAddingNew.isTrue && (
          <FormCard
            defaults={defaults}
            fieldSets={fieldSets}
            onCancel={this.isAddingNew.setFalse}
            onSave={this.handleSaveNew}
            title={`New ${title}`}
          />
        )}

        {isEmpty(model) && !this.isAddingNew.isTrue && <p className="empty-message">No records</p>}

        {model.map(modelItem => (
          <EditableCard
            classNameSuffix={classNameSuffix}
            fieldSets={fieldSets}
            key={modelItem.id}
            model={modelItem}
            onDelete={onDelete}
            onSave={onSave}
            onSuccess={onSuccess}
            title=""
          />
        ))}
      </Antd.Card>
    );
  }
}

export default EditableArrayCard;
