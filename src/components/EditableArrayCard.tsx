import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { isEmpty, kebabCase } from 'lodash';
import autoBindMethods from 'class-autobind-decorator';
import SmartBool from '@mighty-justice/smart-bool';
import * as Antd from 'antd';

import GuardedButton from '../building-blocks/GuardedButton';
import { formPropsDefaults } from '../propsDefaults';
import { ISharedFormProps } from '../props';
import { IFieldSet, IFieldSetPartial } from '../interfaces';

import EditableCard from './EditableCard';
import FormCard from './FormCard';
import { IArrayCardProps } from './ArrayCard';

export interface IEditableArrayCardProps extends IArrayCardProps, ISharedFormProps {
  defaults?: object;
  disableAdd?: boolean;
  disableAddTooltip?: string;
  disableDeleteTooltip?: string;
  disableDelete?: (model: any) => boolean;
  disableEditTooltip?: string;
  disableEdit?: (model: any) => boolean;
  onCreate: (model: unknown) => Promise<any>;
  onCreateFieldsets?: IFieldSet[] | IFieldSetPartial[];
  onDelete?: (model: unknown) => Promise<any>;
}

@autoBindMethods
@observer
class EditableArrayCard extends Component<IEditableArrayCardProps> {
  @observable private isAddingNew = new SmartBool();

  public static defaultProps: Partial<IEditableArrayCardProps> = {
    ...formPropsDefaults,
    disableAdd: false,
    disableAddTooltip: '',
    disableDelete: () => false,
    disableDeleteTooltip: '',
    disableEdit: () => false,
    disableEditTooltip: '',
  };

  private async handleSaveNew (model: any) {
    const { onCreate, onSuccess } = this.props;
    await onCreate(model);
    if (onSuccess) { await onSuccess(); }
    this.isAddingNew.setFalse();
  }

  private renderAddNew () {
    const { title, isLoading, isGuarded, disableAdd, disableAddTooltip } = this.props
      , classNameSuffix = this.props.classNameSuffix || kebabCase(title);

    return (
      <Antd.Tooltip title={disableAdd ? disableAddTooltip : ''}>
        <GuardedButton
          className={`btn-new btn-new-${classNameSuffix}`}
          disabled={isLoading || this.isAddingNew.isTrue || disableAdd}
          icon='plus'
          isGuarded={isGuarded}
          onClick={this.isAddingNew.setTrue}
          size='small'
          type='primary'
        >
          Add
        </GuardedButton>
      </Antd.Tooltip>
    );
  }

  public render () {
    const {
      defaults,
      disableDeleteTooltip,
      disableDelete,
      disableEditTooltip,
      disableEdit,
      fieldSets,
      isLoading,
      model,
      onCreateFieldsets,
      onDelete,
      onSave,
      onSuccess,
      title,
    } = this.props;

    return (
      <Antd.Card title={title} extra={this.renderAddNew()} loading={isLoading}>
        {this.isAddingNew.isTrue && (
          <FormCard
            defaults={defaults}
            fieldSets={onCreateFieldsets || fieldSets}
            onCancel={this.isAddingNew.setFalse}
            onSave={this.handleSaveNew}
            title={`New ${title}`}
          />
        )}

        {isEmpty(model) && !this.isAddingNew.isTrue && (
          <p className='empty-message'>No records</p>
        )}

        {model.map(modelItem => (
          <EditableCard
            classNameSuffix={kebabCase(title)}
            fieldSets={fieldSets}
            key={modelItem.id}
            model={modelItem}
            onDelete={onDelete}
            onSave={onSave}
            onSuccess={onSuccess}
            disableDeleteTooltip={disableDeleteTooltip}
            disableDelete={disableDelete ? disableDelete(modelItem) : false}
            disableEditTooltip={disableEditTooltip}
            disableEdit={disableEdit ? disableEdit(modelItem) : false}
            title=''
          />
        ))}
      </Antd.Card>
    );
  }
}

export default EditableArrayCard;
