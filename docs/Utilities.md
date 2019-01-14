# Utilities

## Fill in partial definitions
```
fillInFieldConfig (fieldConfig: IFieldConfigPartial): IFieldConfig
fillInFieldSet (fieldSet: IFieldSetPartial): IFieldSet
fillInFieldSets (fieldSets: IFieldSetPartial[]): IFieldSet[]
```

## Filter FieldConfigs based on insertIf option
```
filterInsertIf (fieldConfig: IFieldConfig, model: any)
```

## Simple getters
```
getCardModel (model: any, cardConfig: ICardConfig)
getFieldSetFields (fieldSet: IFieldSet): IFieldConfig[]
```

## Type checks: isFieldSetSimple, isPartialFieldSetSimple
```
isFieldSetSimple (fieldSet: IFieldSet): fieldSet is IFieldSetSimple
isPartialFieldSetSimple (fieldSet: IFieldSetPartial): fieldSet is IFieldSetSimplePartial
```
