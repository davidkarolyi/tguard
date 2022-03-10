[tguard](../README.md) / [Exports](../modules.md) / ValidationError

# Class: ValidationError

## Hierarchy

- `Error`

  ↳ **`ValidationError`**

## Table of contents

### Constructors

- [constructor](ValidationError.md#constructor)

### Properties

- [expectedType](ValidationError.md#expectedtype)
- [message](ValidationError.md#message)
- [name](ValidationError.md#name)
- [path](ValidationError.md#path)
- [stack](ValidationError.md#stack)
- [prepareStackTrace](ValidationError.md#preparestacktrace)
- [stackTraceLimit](ValidationError.md#stacktracelimit)

### Methods

- [captureStackTrace](ValidationError.md#capturestacktrace)

## Constructors

### constructor

• **new ValidationError**(`message`, `path`, `expectedType`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `path` | `string`[] |
| `expectedType` | `string` |

#### Overrides

Error.constructor

#### Defined in

[src/errors.ts:5](https://github.com/davidkarolyi/tguard/blob/d84cda9/src/errors.ts#L5)

## Properties

### expectedType

• `Readonly` **expectedType**: `string`

#### Defined in

[src/errors.ts:3](https://github.com/davidkarolyi/tguard/blob/d84cda9/src/errors.ts#L3)

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### path

• `Readonly` **path**: `string`[]

#### Defined in

[src/errors.ts:2](https://github.com/davidkarolyi/tguard/blob/d84cda9/src/errors.ts#L2)

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1024

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
