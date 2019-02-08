import { Component } from 'react';
import { ICommonCardProps } from '../interfaces';
export interface IEditableArrayCardProps extends ICommonCardProps {
    children?: any;
    defaults?: object;
    isGuarded?: boolean;
    isLoading?: boolean;
    model: any[];
    onCreate: (model: any) => Promise<any>;
    onDelete?: (model: any) => Promise<any>;
    onSave: (model: any) => Promise<any>;
    onSuccess: () => Promise<any>;
}
declare class EditableArrayCard extends Component<IEditableArrayCardProps> {
    private isAddingNew;
    private handleSaveNew;
    private renderAddNew;
    render(): JSX.Element;
}
export default EditableArrayCard;
