import { Component } from 'react';
import { ISharedFormProps } from '../props';
import { IArrayCardProps } from './ArrayCard';
export interface IEditableArrayCardProps extends IArrayCardProps, ISharedFormProps {
    defaults?: object;
    onCreate: (model: unknown) => Promise<any>;
    onDelete?: (model: unknown) => Promise<any>;
    disableAdd?: boolean;
    disableAddTooltip?: string;
    disableDeleteTooltip?: string;
    disableDelete?: (model: unknown) => boolean;
    disableEditTooltip?: string;
    disableEdit?: (model: unknown) => boolean;
}
declare class EditableArrayCard extends Component<IEditableArrayCardProps> {
    private isAddingNew;
    static defaultProps: Partial<IEditableArrayCardProps>;
    private handleSaveNew;
    private renderAddNew;
    render(): JSX.Element;
}
export default EditableArrayCard;
