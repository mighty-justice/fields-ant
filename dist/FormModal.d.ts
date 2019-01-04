import React from 'react';
import { ICardConfig } from './interfaces';
interface IProps {
    cardConfig: ICardConfig;
    children?: any;
    close: () => void;
    defaults?: object;
    form: any;
    model?: any;
    onSave: (data: object) => Promise<void>;
    saveText?: string;
}
declare const WrappedFormModal: React.ComponentClass<import("antd/lib/form/Form").RcBaseFormProps & Pick<IProps, "close" | "children" | "model" | "cardConfig" | "defaults" | "onSave" | "saveText">, any>;
export default WrappedFormModal;
