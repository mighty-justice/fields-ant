export default function backendValidation(fieldNames: string[], response: object): {
    errorMessages: {
        field: string;
        message: string;
    }[];
    foundOnForm: {
        [key: string]: string;
    };
};
