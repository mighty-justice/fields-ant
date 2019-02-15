import { IFieldSet } from '../interfaces';
import { IForm } from '../props';
interface IArgs {
    fieldSets: IFieldSet[];
    form: IForm;
    model: {
        [key: string]: any;
        id?: string;
    };
    onSave: (data: {
        [key: string]: any;
    }) => void | Promise<void>;
    onSuccess: () => any | Promise<any>;
}
declare class FormManager {
    saving: boolean;
    private args;
    constructor(form: any, fieldSets: IFieldSet[], args: Partial<IArgs>);
    readonly formModel: any;
    private readonly formValues;
    readonly formFieldNames: string[];
    private onSuccess;
    private setErrorsOnFormFields;
    private notifyUserAboutErrors;
    private handleBackendResponse;
    private validateThenSaveCallback;
    onSave(event: any): Promise<void>;
}
export default FormManager;
