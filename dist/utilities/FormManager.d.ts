import { IFieldConfigPartial, IFieldSet } from '../interfaces';
import { IForm, IModel } from '../props';
interface IArgs {
    defaults: IModel;
    fieldSets: IFieldSet[];
    model: IModel;
    onSave: (data: IModel) => void | Promise<void>;
    onSuccess: () => any | Promise<any>;
}
interface IFormWrappedInstance {
    props: {
        form: IForm;
    };
}
export declare const toastError: {
    description: string;
    duration: null;
    message: string;
};
declare class FormManager {
    saving: boolean;
    private args;
    formWrappedInstance: IFormWrappedInstance;
    constructor(formWrappedInstance: IFormWrappedInstance, fieldSets: IFieldSet[], args: Partial<IArgs>);
    readonly form: any;
    readonly fieldConfigs: import("../interfaces").IFieldConfig[];
    getDefaultValue(fieldConfigPartial: IFieldConfigPartial): any;
    getFormValue(fieldConfigPartial: IFieldConfigPartial): any;
    private readonly formValues;
    readonly formModel: IModel;
    readonly submitModel: IModel;
    readonly formFieldNames: string[];
    private onSuccess;
    private setErrorsOnFormFields;
    private notifyUserAboutErrors;
    private handleBackendResponse;
    private validateThenSaveCallback;
    onSave(event: any): Promise<void>;
}
export default FormManager;
