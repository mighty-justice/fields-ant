# Interfaces

## FieldConfig

This defines the core common interface for mighty fields, the IFieldConfig.

This excludes all fields used only by a single type ( see below )
It also will almost never be written out by a user, since it's
much easier to call a function to fill in a partial definition
than to fill all this in (see further below for partials).

```ts
interface IFieldConfig {
  className?: any;
  disabled?: boolean;
  editComponent: any;
  editProps: { [key: string]: any };
  field: string;
  fieldConfigProp: boolean;
  formItemProps?: { [key: string]: any };
  formValidationRules: any[];
  fromForm: (value: any) => any;
  icon?: string;
  insertIf?: (model: any) => boolean;
  key: string;
  label: string | null;
  nullify: boolean;
  readOnly: boolean;
  render: (...args: any[]) => string | JSX.Element | JSX.Element[];
  required: boolean;
  showLabel: boolean;
  toForm: (data: any, field: string) => any;
  type: string;
  value?: string | number;
  writeOnly?: boolean;
}
```

## FieldSet


A set of fieldConfigs, or fieldSet
Has a simple list form and a more complex object form;
Is often used throughout the library as `FieldSet[]`
```ts
export type IFieldSetSimple = IFieldConfig[];

export interface IFieldSetComplex {
  fields: IFieldSetSimple;
  legend: string;
}

export type IFieldSet = IFieldSetSimple | IFieldSetComplex;
```

## Partial

Usually, you won't directly import fill interfaces. Components take partial
definitions and then fill them in with the defaults for their type. See the
utilities page for more.


```ts
export type IFieldConfigPartial = Partial<IFieldConfig> & { field: string; };
export type IFieldSetSimplePartial = IFieldConfigPartial[];

export interface IFieldSetComplexPartial {
  fields: IFieldSetSimplePartial;
  legend: string;
}

export type IFieldSetPartial = IFieldSetSimplePartial | IFieldSetComplexPartial;
```

## Card Config

```ts
export interface ICardConfig {
  accessor?: string;
  classNameSuffix?: string;
  fieldSets: IFieldSet[] | IFieldSetPartial[];
  isArray?: boolean;
  title?: string;
}
```
