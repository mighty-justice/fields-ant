import { Component } from 'react';
import { ICommonCardProps } from '../interfaces';
interface IProps extends ICommonCardProps {
    children?: any;
    isGuarded?: boolean;
    isLoading?: boolean;
    model: any;
    onDelete?: (model: any) => Promise<any>;
    onSave: (model: any) => Promise<any>;
    onSuccess?: () => Promise<any>;
}
interface IPropDefaults extends IProps {
    onSuccess: () => Promise<any>;
}
declare class EditableCard extends Component<IProps> {
    private isDeleting;
    private isEditing;
    static defaultProps: Partial<IProps>;
    readonly propsWithDefaults: IPropDefaults;
    private handleDelete;
    private handleSave;
    private readonly deleteButton;
    private readonly editButton;
    private buttons;
    render(): JSX.Element;
}
export default EditableCard;
