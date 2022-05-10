[tguard](../README.md) / [Exports](../modules.md) / Guard

# Class: Guard<T\>

An abstract class, which is the parent class of all Guards. (Names starting with a `T`)

⚠️ Don't use this directly to create custom guards, use `TValidate` instead.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Guarded type |

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

[src/Guard.ts:11](https://github.com/davidkarolyi/tguard/blob/458c9b2/src/Guard.ts#L11)

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

[src/Guard.ts:13](https://github.com/davidkarolyi/tguard/blob/458c9b2/src/Guard.ts#L13)

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

[src/Guard.ts:12](https://github.com/davidkarolyi/tguard/blob/458c9b2/src/Guard.ts#L12)
