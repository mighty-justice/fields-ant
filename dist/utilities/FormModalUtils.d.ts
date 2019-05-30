import { ISharedFormModalProps } from '../props';
declare class FormModalUtils {
    private props;
    constructor(props: ISharedFormModalProps);
    readonly isVisible: boolean;
    readonly formProps: Partial<ISharedFormModalProps>;
    onCancel(): void;
    onSuccess(): Promise<void>;
}
export default FormModalUtils;
