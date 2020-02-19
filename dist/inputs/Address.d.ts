import { Component } from 'react';
import { FormManager, IFieldConfig, IFieldConfigAddress } from '../';
import { IModel } from '../props';
export interface IAddressProps {
    fieldConfig: IFieldConfigAddress;
    formManager: FormManager;
    formModel: IModel;
}
export declare function isTypeAddress(fieldConfig: IFieldConfig): fieldConfig is IFieldConfigAddress;
declare class Address extends Component<IAddressProps> {
    private get injected();
    private get fieldSet();
    render(): JSX.Element;
}
export default Address;
