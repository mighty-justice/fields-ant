import { Component } from 'react';
import { ICardConfig } from '../interfaces';
interface IProps {
    cardConfig: ICardConfig;
    children?: any;
    isGuarded?: boolean;
    isLoading?: boolean;
    model: any;
    onDelete?: (model: any) => Promise<any>;
    onSave: (model: any) => Promise<any>;
    onSuccess: () => Promise<any>;
}
declare class EditableCard extends Component<IProps> {
    private isDeleting;
    private isEditing;
    private handleDelete;
    private handleSave;
    private readonly deleteButton;
    private readonly editButton;
    private buttons;
    render(): JSX.Element;
}
export default EditableCard;
