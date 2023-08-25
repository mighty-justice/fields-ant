import { Component } from 'react';
import { ISharedFormModalProps, ISharedFormProps } from '../props';
import { ICardProps } from './Card';
import FormDrawer from './FormDrawer';
import FormModal from './FormModal';
export interface IEditableCardProps extends ICardProps, ISharedFormProps {
    disableDeleteTooltip?: string;
    disableDelete: boolean;
    disableEditTooltip?: string;
    disableEdit: boolean;
    ModalComponent: new (props: ISharedFormModalProps) => FormModal | FormDrawer;
    onDelete?: (model: unknown) => Promise<any>;
}
declare class EditableCard extends Component<IEditableCardProps> {
    private isDeleting;
    private isEditing;
    static defaultProps: Partial<IEditableCardProps>;
    private handleDelete;
    private handleSave;
    private get deleteButton();
    private get editButton();
    private buttons;
    render(): JSX.Element;
}
export default EditableCard;
