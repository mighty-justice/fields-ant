import { Component } from 'react';
import { ISharedFormProps } from '../props';
import { IFieldSet, IFieldSetPartial } from '../interfaces';
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
declare class EditableArrayCard extends Component<IEditableArrayCardProps> {
    private isAddingNew;
    static defaultProps: Partial<IEditableArrayCardProps>;
    private handleSaveNew;
    private renderAddNew;
    render(): JSX.Element;
}
export default EditableArrayCard;
