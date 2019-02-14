import { Component } from 'react';
import { IFormProps } from '../props';
import { ICardProps } from './Card';
export interface IEditableCardProps extends ICardProps, IFormProps {
    onDelete?: (model: unknown) => Promise<any>;
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
