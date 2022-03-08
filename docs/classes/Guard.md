[tguard](../README.md) / [Exports](../modules.md) / Guard

# Class: Guard<T\>

An abstract class, which has an `isValid` method, and a `name` property, which represents the name of the guarded type.

⚠️ Don't use this directly to create custom guards, use `TValidate` instead.

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](Guard.md#constructor)

### Properties

- [name](Guard.md#name)

### Methods

- [cast](Guard.md#cast)
- [isValid](Guard.md#isvalid)

## Constructors

### constructor

• **new Guard**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

## Properties

### name

• `Readonly` `Abstract` **name**: `string`

#### Defined in

[src/Guard.ts:9](https://github.com/davidkarolyi/tguard/blob/9309bca/src/Guard.ts#L9)

## Methods

### cast

▸ **cast**(`value`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`T`

#### Defined in

[src/Guard.ts:11](https://github.com/davidkarolyi/tguard/blob/9309bca/src/Guard.ts#L11)

___

### isValid

▸ `Abstract` **isValid**(`value`): value is T

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is T

#### Defined in

[src/Guard.ts:10](https://github.com/davidkarolyi/tguard/blob/9309bca/src/Guard.ts#L10)
