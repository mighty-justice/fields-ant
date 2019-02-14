/// <reference types="rosie" />
import { IValue } from '../src/props';
export declare const fieldFactory: import("rosie").IFactory<any>;
export declare const dateFactory: import("rosie").IFactory<{}>;
export declare const moneyFactory: import("rosie").IFactory<{}>;
export declare const percentageFactory: import("rosie").IFactory<{}>;
export declare const radioFactory: import("rosie").IFactory<{}>;
export declare const stringFactory: import("rosie").IFactory<{}>;
export declare const textFactory: import("rosie").IFactory<{}>;
export declare const objectSearchCreateFactory: import("rosie").IFactory<{}>;
export declare const ratingFactory: import("rosie").IFactory<{}>;
export declare const booleanFactory: import("rosie").IFactory<{}>;
export declare const durationFactory: import("rosie").IFactory<{}>;
export declare const emailFactory: import("rosie").IFactory<{}>;
export declare const numberFactory: import("rosie").IFactory<{}>;
export declare const optionSelectFactory: import("rosie").IFactory<{}>;
export declare const fieldSetFactory: import("rosie").IFactory<any>;
export declare const cardPropsFactory: import("rosie").IFactory<any>;
export declare const summaryCardPropsFactory: import("rosie").IFactory<{}>;
export declare const formCardPropsFactory: import("rosie").IFactory<{}>;
export declare const editableCardPropsFactory: import("rosie").IFactory<{}>;
export declare const arrayCardPropsFactory: import("rosie").IFactory<{}>;
export declare const editableArrayCardPropsFactory: import("rosie").IFactory<{}>;
export declare const formDrawerPropsFactory: import("rosie").IFactory<{}>;
export declare const formModalPropsFactory: import("rosie").IFactory<{}>;
interface ITypeGenerators {
    [key: string]: {
        fieldConfigFactory: any;
        valueFunction: () => IValue;
    };
}
export declare const TYPE_GENERATORS: ITypeGenerators;
interface IComponentGenerators {
    [key: string]: {
        Component: any;
        propsFactory: {
            build: (overrides?: object) => object;
        };
    };
}
export declare const COMPONENT_GENERATORS: IComponentGenerators;
export {};
