import React from 'react';
import { ICardConfig } from '../interfaces';
interface IProps {
    cardConfig: ICardConfig;
    children?: any;
    childrenBefore?: any;
    close: () => void;
    defaults?: object;
    form: any;
    model?: any;
    onSave: (data: object) => Promise<void>;
    saveText?: string;
}
declare const WrappedFormModal: React.ComponentClass<import("antd/lib/form/Form").RcBaseFormProps & Pick<IProps, "model" | "onSave" | "children" | "cardConfig" | "childrenBefore" | "close" | "defaults" | "saveText">, any>;
export default WrappedFormModal;
