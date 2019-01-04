import { IFieldSet } from './interfaces';
interface IArgs {
    fieldSets: IFieldSet[];
    form: any;
    model: {
        [key: string]: any;
        id?: string;
    };
    onSave: (data: {
        [key: string]: any;
    }) => void | Promise<void>;
    onSuccess: () => void;
}
declare class FormManager {
    saving: boolean;
    private args;
    constructor(form: any, fieldSets: IFieldSet[], args: Partial<IArgs>);
    readonly formModel: any;
    onSave(event: any): Promise<void>;
}
export default FormManager;
