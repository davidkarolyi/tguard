[tguard](../README.md) / [Exports](../modules.md) / Guard

# Class: Guard<S\>

Guards a type defined by the given schema.

**`example`**
```ts
const TPost = new Guard({
  id: TStringUUID({version: 4});
  title: TString,
  body: TString,
});

const TUser = new Guard({
  id: TStringUUID({version: 4});
  name: TString,
  posts: TArray(TPost),
});

// Note: If you don't want to define these types twice
// (once as a TypeScript type, once as a guard):
type User = GuardedType<typeof TUser>;
type Post = GuardedType<typeof TPost>;

// We have an unknown value, that we fetched from an external API,
// TypeScript will implicitly infer it as "any" type:
const john: any = {
  name: "John",
  posts: ["Who am I?", "I am a user."],
};

// Validate if John is a valid 'User' type or not:
if (TUser.isValid(john)) {
  // TypeScript will infer John's type as 'User' in this block.
}

// Or try to cast a value to the User type:
try {
const user = TUser.cast({ posts: ["Who am I?", "I am a user."] });
  // Type of user is User
} catch (error) {
  // error.message === 'Validation failed: Missing value at "id", expected type: string(UUID-v4)'
}
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`Schema`](../modules.md#schema) |

## Hierarchy

- [`Validator`](Validator.md)<[`SchemaType`](../modules.md#schematype)<`S`\>\>

  ↳ **`Guard`**

## Table of contents

### Constructors

- [constructor](Guard.md#constructor)

### Properties

- [name](Guard.md#name)
- [schema](Guard.md#schema)

### Accessors

- [expectedSchema](Guard.md#expectedschema)

### Methods

- [cast](Guard.md#cast)
- [createTreeFromSchema](Guard.md#createtreefromschema)
- [instantiateValidatorsInSchemaTree](Guard.md#instantiatevalidatorsinschematree)
- [isValid](Guard.md#isvalid)
- [resolveSchema](Guard.md#resolveschema)

## Constructors

### constructor

• **new Guard**<`S`\>(`schema`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`Schema`](../modules.md#schema)<`any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | `S` | Can be a single `Validator`, an other `Guard`, or an object of these types. |

#### Overrides

[Validator](Validator.md).[constructor](Validator.md#constructor)

#### Defined in

[src/guard.ts:64](https://github.com/davidkarolyi/tguard/blob/bdc8bc0/src/guard.ts#L64)

## Properties

### name

• `Readonly` **name**: `string`

#### Overrides

[Validator](Validator.md).[name](Validator.md#name)

#### Defined in

[src/guard.ts:57](https://github.com/davidkarolyi/tguard/blob/bdc8bc0/src/guard.ts#L57)

___

### schema

• `Private` `Readonly` **schema**: `Tree`<[`Validator`](Validator.md)<`unknown`\>\>

#### Defined in

[src/guard.ts:58](https://github.com/davidkarolyi/tguard/blob/bdc8bc0/src/guard.ts#L58)

## Accessors

### expectedSchema

• `get` **expectedSchema**(): [`TreeDefinition`](../modules.md#treedefinition)<`string`\>

#### Returns

[`TreeDefinition`](../modules.md#treedefinition)<`string`\>

#### Defined in

[src/guard.ts:73](https://github.com/davidkarolyi/tguard/blob/bdc8bc0/src/guard.ts#L73)

## Methods

### cast

▸ **cast**(`value`): [`SchemaType`](../modules.md#schematype)<`S`\>

The `cast` method will take any value and return the same value, but typed as the guarded type.
If the value isn't matching the schema, it will throw an `Error` containing the reason of failure.

**`example`**
```ts
const TPost = new Guard({
  id: TStringUUID({version: 4});
  title: TString,
  body: TString,
});

const TUser = new Guard({
  id: TStringUUID({version: 4});
  name: TString,
  posts: TArray(TPost),
});

try {
const user = TUser.cast({ posts: ["Who am I?", "I am a user."] });
  // Type of user is User
} catch (error) {
  // error.message === 'Validation failed: Missing value at "id", expected type: string(UUID-v4)'
}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

[`SchemaType`](../modules.md#schematype)<`S`\>

#### Defined in

[src/guard.ts:118](https://github.com/davidkarolyi/tguard/blob/bdc8bc0/src/guard.ts#L118)

___

### createTreeFromSchema

▸ `Private` **createTreeFromSchema**(`schema`): `Tree`<[`ValidatorOrConstructor`](../modules.md#validatororconstructor)<`unknown`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](../modules.md#schema)<`any`\> |

#### Returns

`Tree`<[`ValidatorOrConstructor`](../modules.md#validatororconstructor)<`unknown`\>\>

#### Defined in

[src/guard.ts:142](https://github.com/davidkarolyi/tguard/blob/bdc8bc0/src/guard.ts#L142)

___

### instantiateValidatorsInSchemaTree

▸ `Private` **instantiateValidatorsInSchemaTree**(`tree`): `Tree`<[`Validator`](Validator.md)<`unknown`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tree` | `Tree`<[`ValidatorOrConstructor`](../modules.md#validatororconstructor)<`unknown`\>\> |

#### Returns

`Tree`<[`Validator`](Validator.md)<`unknown`\>\>

#### Defined in

[src/guard.ts:154](https://github.com/davidkarolyi/tguard/blob/bdc8bc0/src/guard.ts#L154)

___

### isValid

▸ **isValid**(`value`): value is SchemaType<S\>

The `isValid` method is a
[type predicate function](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates).

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is SchemaType<S\>

If the the given `value` is matching the `schema`.

#### Overrides

[Validator](Validator.md).[isValid](Validator.md#isvalid)

#### Defined in

[src/guard.ts:83](https://github.com/davidkarolyi/tguard/blob/bdc8bc0/src/guard.ts#L83)

___

### resolveSchema

▸ `Private` **resolveSchema**(`schema`): `Tree`<[`Validator`](Validator.md)<`unknown`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](../modules.md#schema)<`any`\> |

#### Returns

`Tree`<[`Validator`](Validator.md)<`unknown`\>\>

#### Defined in

[src/guard.ts:137](https://github.com/davidkarolyi/tguard/blob/bdc8bc0/src/guard.ts#L137)
