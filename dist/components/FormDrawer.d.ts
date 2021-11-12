import React, { Component } from 'react';
import { ISharedFormModalProps } from '../props';
declare class FormDrawer extends Component<ISharedFormModalProps> {
    static defaultProps: {
        cancelText: string;
        onSave: () => Promise<void>;
        saveText: string;
    };
    get isVisible(): boolean;
    get formProps(): {
        width?: string | number | undefined;
        children?: React.ReactNode;
        className?: import("classnames/types").ClassValue;
        classNameSuffix?: string | undefined;
        fieldSets: import("..").IFieldSetPartial[] | import("..").IFieldSet[];
        isLoading?: boolean | undefined;
        model?: import("../props").IModel | undefined;
        layout?: "inline" | "horizontal" | "vertical" | undefined;
        colon?: boolean | undefined;
        blockSubmit?: boolean | undefined;
        cancelText: string;
        defaults?: object | undefined;
        disabled?: boolean | undefined;
        isGuarded?: boolean | undefined;
        onCancel?: (() => void) | undefined;
        onSave: (data: object) => any;
        onSuccess?: (() => any) | undefined;
        processErrors?: ((errors: import("../utilities/FormManager").IBackendValidation) => import("../utilities/FormManager").IBackendValidation) | undefined;
        resetOnSuccess?: boolean | undefined;
        saveText: string;
        setRefFormManager?: ((formManager: import("../utilities/FormManager").default) => void) | undefined;
        successText?: string | null | undefined;
    };
    onCancel(): void;
    onSuccess(): Promise<void>;
    render(): JSX.Element | null;
}
export default FormDrawer;
