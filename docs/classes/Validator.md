[tguard](../README.md) / [Exports](../modules.md) / Validator

# Class: Validator<T\>

An abstract class, which has an `isValid` method, and a `name` property, which represents the name of the guarded type.

⚠️ Don't use this directly to create custom validators, use `TValidate` instead.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- **`Validator`**

  ↳ [`Guard`](Guard.md)

## Table of contents

### Constructors

- [constructor](Validator.md#constructor)

### Properties

- [name](Validator.md#name)

### Methods

- [isValid](Validator.md#isvalid)

## Constructors

### constructor

• **new Validator**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

## Properties

### name

• `Readonly` `Abstract` **name**: `string`

#### Defined in

[src/types.ts:9](https://github.com/davidkarolyi/tguard/blob/f6f4bca/src/types.ts#L9)

## Methods

### isValid

▸ `Abstract` **isValid**(`value`): value is T

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is T

#### Defined in

[src/types.ts:10](https://github.com/davidkarolyi/tguard/blob/f6f4bca/src/types.ts#L10)
