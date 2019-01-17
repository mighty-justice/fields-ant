import React from 'react';
import { ICardConfig } from '../interfaces';
interface IProps {
    cardConfig: ICardConfig;
    children?: any;
    close?: () => void;
    defaults?: object;
    form: any;
    model?: any;
    onSave: (data: object) => Promise<void>;
    renderTopRight?: () => any;
}
declare const WrappedFormCard: React.ComponentClass<import("antd/lib/form/Form").RcBaseFormProps & Pick<IProps, "close" | "children" | "defaults" | "model" | "cardConfig" | "renderTopRight" | "onSave">, any>;
export default WrappedFormCard;
