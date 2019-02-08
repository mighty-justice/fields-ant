import { Component } from 'react';
import { ICommonCardProps } from '../interfaces';
export interface IEditableCardProps extends ICommonCardProps {
    children?: any;
    isGuarded?: boolean;
    isLoading?: boolean;
    model: any;
    onDelete?: (model: any) => Promise<any>;
    onSave: (model: any) => Promise<any>;
    onSuccess?: () => Promise<any>;
}
interface IPropDefaults extends IEditableCardProps {
    onSuccess: () => Promise<any>;
}
declare class EditableCard extends Component<IEditableCardProps> {
    private isDeleting;
    private isEditing;
    static defaultProps: Partial<IEditableCardProps>;
    readonly propsWithDefaults: IPropDefaults;
    private handleDelete;
    private handleSave;
    private readonly deleteButton;
    private readonly editButton;
    private buttons;
    render(): JSX.Element;
}
export default EditableCard;
