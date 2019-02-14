import { Component } from 'react';
import { IFormProps } from '../props';
import { IArrayCardProps } from './ArrayCard';
export interface IEditableArrayCardProps extends IArrayCardProps, IFormProps {
    defaults?: object;
    onCreate: (model: unknown) => Promise<any>;
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
