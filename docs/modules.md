[tguard](README.md) / Exports

# tguard

## Table of contents

### Classes

- [Guard](classes/Guard.md)
- [ValidationError](classes/ValidationError.md)
- [Validator](classes/Validator.md)

### Type aliases

- [ArrayType](modules.md#arraytype)
- [Constructor](modules.md#constructor)
- [GuardedType](modules.md#guardedtype)
- [Schema](modules.md#schema)
- [SchemaType](modules.md#schematype)
- [TreeDefinition](modules.md#treedefinition)
- [ValidatorOrConstructor](modules.md#validatororconstructor)
- [ValidatorType](modules.md#validatortype)

### Variables

- [TAny](modules.md#tany)
- [TBigInt](modules.md#tbigint)
- [TBoolean](modules.md#tboolean)
- [TFunction](modules.md#tfunction)
- [TInteger](modules.md#tinteger)
- [TIntegerAsString](modules.md#tintegerasstring)
- [TNull](modules.md#tnull)
- [TNumber](modules.md#tnumber)
- [TNumberAsString](modules.md#tnumberasstring)
- [TObject](modules.md#tobject)
- [TString](modules.md#tstring)
- [TStringEmail](modules.md#tstringemail)
- [TStringISODate](modules.md#tstringisodate)
- [TStringJSON](modules.md#tstringjson)
- [TStringJWT](modules.md#tstringjwt)
- [TStringMIMEType](modules.md#tstringmimetype)
- [TStringPhoneNumber](modules.md#tstringphonenumber)
- [TStringSemVer](modules.md#tstringsemver)
- [TStringURL](modules.md#tstringurl)
- [TUndefined](modules.md#tundefined)

### Functions

- [TAnd](modules.md#tand)
- [TArray](modules.md#tarray)
- [TConstant](modules.md#tconstant)
- [TNot](modules.md#tnot)
- [TObjectOfShape](modules.md#tobjectofshape)
- [TOr](modules.md#tor)
- [TStringBase64](modules.md#tstringbase64)
- [TStringMatch](modules.md#tstringmatch)
- [TStringOfLength](modules.md#tstringoflength)
- [TStringUUID](modules.md#tstringuuid)
- [TValidate](modules.md#tvalidate)

## Type aliases

### ArrayType

Ƭ **ArrayType**<`C`\>: `C` extends infer T[] ? `T` : `unknown`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `unknown`[] |

#### Defined in

[src/types.ts:44](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/types.ts#L44)

___

### Constructor

Ƭ **Constructor**<`T`\>: () => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

• ()

#### Defined in

[src/types.ts:48](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/types.ts#L48)

___

### GuardedType

Ƭ **GuardedType**<`G`\>: [`ValidatorType`](modules.md#validatortype)<`G`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `G` | extends [`Guard`](classes/Guard.md)<[`Schema`](modules.md#schema)\> |

#### Defined in

[src/guard.ts:14](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/guard.ts#L14)

___

### Schema

Ƭ **Schema**<`T`\>: [`TreeDefinition`](modules.md#treedefinition)<[`ValidatorOrConstructor`](modules.md#validatororconstructor)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[src/types.ts:27](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/types.ts#L27)

___

### SchemaType

Ƭ **SchemaType**<`C`\>: `C` extends [`Constructor`](modules.md#constructor)<[`Validator`](classes/Validator.md)<`unknown`\>\> ? [`ValidatorType`](modules.md#validatortype)<`InstanceType`<`C`\>\> : `C` extends [`Validator`](classes/Validator.md)<`unknown`\> ? [`ValidatorType`](modules.md#validatortype)<`C`\> : `C` extends { `[fieldName: string]`: [`Schema`](modules.md#schema);  } ? { [Property in keyof C]: SchemaType<C[Property]\> } : `unknown`

Infers the type, that the given `Schema` represents.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`Schema`](modules.md#schema) |

#### Defined in

[src/types.ts:32](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/types.ts#L32)

___

### TreeDefinition

Ƭ **TreeDefinition**<`T`\>: { `[fieldName: string]`: [`TreeDefinition`](modules.md#treedefinition)<`T`\>;  } \| `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/tree.ts:1](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/tree.ts#L1)

___

### ValidatorOrConstructor

Ƭ **ValidatorOrConstructor**<`T`\>: [`Validator`](classes/Validator.md)<`T`\> \| [`Constructor`](modules.md#constructor)<[`Validator`](classes/Validator.md)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Defined in

[src/types.ts:13](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/types.ts#L13)

___

### ValidatorType

Ƭ **ValidatorType**<`C`\>: `C` extends [`Validator`](classes/Validator.md)<infer T\> ? `T` : `C` extends [`Constructor`](modules.md#constructor)<[`Validator`](classes/Validator.md)<infer T\>\> ? `T` : `unknown`

Infers the type, that the given `Validator` validates.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`ValidatorOrConstructor`](modules.md#validatororconstructor)<`unknown`\> |

#### Defined in

[src/types.ts:20](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/types.ts#L20)

## Variables

### TAny

• `Const` **TAny**: [`Validator`](classes/Validator.md)<`any`\>

Validator that accepts any value.

`validator.name`: `"any"`

#### Defined in

[src/validators.ts:142](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L142)

___

### TBigInt

• `Const` **TBigInt**: [`Validator`](classes/Validator.md)<`BigInt`\>

Primitive validator that only accepts the JS type `bigint`.

`validator.name`: `"bigint"`

#### Defined in

[src/validators.ts:125](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L125)

___

### TBoolean

• `Const` **TBoolean**: [`Validator`](classes/Validator.md)<`boolean`\>

Primitive validator that only accepts the JS type `boolean`.

`validator.name`: `"boolean"`

#### Defined in

[src/validators.ts:84](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L84)

___

### TFunction

• `Const` **TFunction**: [`Validator`](classes/Validator.md)<`Function`\>

Primitive validator that only accepts the JS type `function`.

`validator.name`: `"function"`

#### Defined in

[src/validators.ts:94](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L94)

___

### TInteger

• `Const` **TInteger**: [`Validator`](classes/Validator.md)<`number`\>

Validator that accepts whole numbers.

`validator.name`: `"integer"`

**`example`**
 ```ts
TInteger.isValid("15"); // false
TInteger.isValid(15.223); // false
TInteger.isValid(15); // true
```

#### Defined in

[src/validators.ts:156](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L156)

___

### TIntegerAsString

• `Const` **TIntegerAsString**: [`Validator`](classes/Validator.md)<`string`\>

Validator that accepts strings, which can be parsed as a valid integer.

`validator.name`: `"integer(as a string)"`

**`example`**
 ```ts
TIntegerAsString.isValid("15.223"); // false
TIntegerAsString.isValid(15); // false
TIntegerAsString.isValid("15"); // true
```

#### Defined in

[src/validators.ts:194](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L194)

___

### TNull

• `Const` **TNull**: [`Validator`](classes/Validator.md)<``null``\>

Validator that only accepts `null`.

`validator.name`: `"null"`

#### Defined in

[src/validators.ts:135](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L135)

___

### TNumber

• `Const` **TNumber**: [`Validator`](classes/Validator.md)<`number`\>

Primitive validator that only accepts numbers.
Not accepts NaN.

`validator.name`: `"number"`

#### Defined in

[src/validators.ts:74](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L74)

___

### TNumberAsString

• `Const` **TNumberAsString**: [`Validator`](classes/Validator.md)<`string`\>

Validator that accepts strings, which represents a valid number.

`validator.name`: `"number(as a string)"`

**`example`**
 ```ts
TNumberAsString.isValid("abcd"); // false
TNumberAsString.isValid(15.223); // false
TNumberAsString.isValid("15.223"); // true
```

#### Defined in

[src/validators.ts:173](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L173)

___

### TObject

• `Const` **TObject**: [`Validator`](classes/Validator.md)<`Object`\>

Primitive validator that only accepts objects.
Does not accept null.

`validator.name`: `"object"`

#### Defined in

[src/validators.ts:105](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L105)

___

### TString

• `Const` **TString**: [`Validator`](classes/Validator.md)<`string`\>

Primitive validator that only accepts the JS type `string`.

`validator.name`: `string`

#### Defined in

[src/validators.ts:63](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L63)

___

### TStringEmail

• `Const` **TStringEmail**: [`Validator`](classes/Validator.md)<`string`\>

A `Validator` which validates if a string is a valid email.

`validator.name`: `"string(email)"`

**`example`**
```ts
TStringEmail.isValid("1234"); // false
TStringEmail.isValid("foo@bar.com"); // true
TStringEmail.name === "string(email)"; // true
```

#### Defined in

[src/validators.ts:512](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L512)

___

### TStringISODate

• `Const` **TStringISODate**: [`Validator`](classes/Validator.md)<`string`\>

A `Validator` which validates if a string is a valid ISO date string.

`validator.name`: `"string(date)"`

**`example`**
```ts
TStringISODate.isValid("1234"); // false
TStringISODate.isValid("2022-03-06T22:01:41.160Z"); // true
TStringISODate.name === "string(date)"; // true
```

#### Defined in

[src/validators.ts:529](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L529)

___

### TStringJSON

• `Const` **TStringJSON**: [`Validator`](classes/Validator.md)<`string`\>

A `Validator` which validates if a string is a valid JSON.

`validator.name`: `"string(JSON)"`

**`example`**
```ts
TStringJSON.isValid("1234"); // false
TStringJSON.isValid("{\"foo\": 2}"); // true
TStringJSON.name === "string(JSON)"; // true
```

#### Defined in

[src/validators.ts:546](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L546)

___

### TStringJWT

• `Const` **TStringJWT**: [`Validator`](classes/Validator.md)<`string`\>

A `Validator` which validates if a string is a valid JSON Web Token.

`validator.name`: `"string(JWT)"`

**`example`**
```ts
TStringJWT.isValid("1234"); // false
TStringJWT.isValid("something.fooo.bar"); // true
TStringJWT.name === "string(JSON)"; // true
```

#### Defined in

[src/validators.ts:563](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L563)

___

### TStringMIMEType

• `Const` **TStringMIMEType**: [`Validator`](classes/Validator.md)<`string`\>

A `Validator` which validates if a string is a valid [MIME type](https://en.wikipedia.org/wiki/Media_type).

`validator.name`: `"string(MIME type)"`

**`example`**
```ts
TStringMIMEType.isValid("foobar"); // false
TStringMIMEType.isValid("application/json"); // true
TStringMIMEType.name === "string(MIME type)"; // true
```

#### Defined in

[src/validators.ts:580](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L580)

___

### TStringPhoneNumber

• `Const` **TStringPhoneNumber**: [`Validator`](classes/Validator.md)<`string`\>

A `Validator` which validates if a string is a valid phone number.
(all locale formats are accepted)

`validator.name`: `"string(phone number)"`

**`example`**
```ts
TStringPhoneNumber.isValid("foobar"); // false
TStringPhoneNumber.isValid("061555555"); // true
TStringPhoneNumber.name === "string(phone number)"; // true
```

#### Defined in

[src/validators.ts:598](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L598)

___

### TStringSemVer

• `Const` **TStringSemVer**: [`Validator`](classes/Validator.md)<`string`\>

A `Validator` which checks if the string is a Semantic Versioning Specification (SemVer).

`validator.name`: `"string(SemVer)"`

**`example`**
```ts
TStringSemVer.isValid("foobar"); // false
TStringSemVer.isValid("1.0.4"); // true
TStringSemVer.name === "string(SemVer)"; // true
```

#### Defined in

[src/validators.ts:615](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L615)

___

### TStringURL

• `Const` **TStringURL**: [`Validator`](classes/Validator.md)<`string`\>

A `Validator` which checks if the string is a valid URL.

`validator.name`: `"string(URL)"`

**`example`**
```ts
TStringURL.isValid("foobar"); // false
TStringURL.isValid("foobar.com"); // true
TStringURL.name === "string(URL)"; // true
```

#### Defined in

[src/validators.ts:632](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L632)

___

### TUndefined

• `Const` **TUndefined**: [`Validator`](classes/Validator.md)<`undefined`\>

Primitive validator that only accepts the JS type `undefined`.

`validator.name`: `"undefined"`

#### Defined in

[src/validators.ts:115](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L115)

## Functions

### TAnd

▸ **TAnd**<`A`, `B`\>(`validatorA`, `validatorB`): [`Validator`](classes/Validator.md)<`A` & `B`\>

Validates if criterias of two types are both met.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `validatorA` | [`ValidatorOrConstructor`](modules.md#validatororconstructor)<`A`\> |
| `validatorB` | [`ValidatorOrConstructor`](modules.md#validatororconstructor)<`B`\> |

#### Returns

[`Validator`](classes/Validator.md)<`A` & `B`\>

A `Validator` that is similar in concept as the `&` operator in TypeScript.
Accepts a value when it was accepted by both `validatorA` and `validatorB`.

`validator.name`: `"<typeA> & <typeB>"`

#### Defined in

[src/validators.ts:386](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L386)

___

### TArray

▸ **TArray**<`T`\>(`validator`, `options?`): [`Validator`](classes/Validator.md)<`T`[]\>

Validates an array of elements.

**`example`**
```ts
const validator = TArray(TNumber);
validator.isValid([1, 2, 3]); // true
validator.isValid([1, 2, "3"]); // false
validator.name === "number[]"; // true
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `validator` | [`ValidatorOrConstructor`](modules.md#validatororconstructor)<`T`\> | The validator, which validates the elements of the array. |
| `options?` | `Object` | - |
| `options.maxLength?` | `number` | The array can't be longer than this. |
| `options.minLength?` | `number` | The array must be at least this long. |

#### Returns

[`Validator`](classes/Validator.md)<`T`[]\>

A `Validator` that checks if the given value is an array of the given type.

`validator.name`: `"<type>[](minLength:<minLength>,maxLength:<maxLength>)"`

#### Defined in

[src/validators.ts:223](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L223)

___

### TConstant

▸ **TConstant**<`T`\>(`constant`): [`Validator`](classes/Validator.md)<`T`\>

Validates equality to a literal value.

**`example`**
```ts
const validator = TConstant("foo")

validator.isValid("foobar"); // false
validator.isValid("bar"); // false
validator.isValid("foo"); // true

validator.name === 'constant("foo")'; // true
TConstant(2).name === 'constant(2)'; // true
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| `number` \| `boolean` \| `BigInt` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `constant` | `T` | The literal to compare values against. Only can be a string, number, boolean or bigint. |

#### Returns

[`Validator`](classes/Validator.md)<`T`\>

A `Validator` which checks if the given value is equals to the `constant` literal.

`validator.name`: `"constant(<constant>)"`

#### Defined in

[src/validators.ts:686](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L686)

___

### TNot

▸ **TNot**<`T`\>(`validator`): [`Validator`](classes/Validator.md)<`Exclude`<`any`, `T`\>\>

Negates a type criteria.

**`example`**
```ts
const validator = TNot(TNumber);
validator.isValid(1); // false
validator.isValid("foo"); // true
validator.name === "!number"; // true
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `validator` | [`ValidatorOrConstructor`](modules.md#validatororconstructor)<`T`\> | The validator, which will be negated. |

#### Returns

[`Validator`](classes/Validator.md)<`Exclude`<`any`, `T`\>\>

A `Validator` that accepts a value when it was **not** accepted by the given validator.

`validator.name`: `"!<type>"`

#### Defined in

[src/validators.ts:328](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L328)

___

### TObjectOfShape

▸ **TObjectOfShape**<`T`\>(`shape`): [`Validator`](classes/Validator.md)<`Record`<`string`, `T`\>\>

Validates the shape of an object.

**`example`**
 ```ts
const validator = TObjectShape({
  keys: TString,
  values: TNumber,
});

validator.isValid({
  avocado: 2,
  orange: 5,
}); // true

validator.isValid({
  avocado: "green",
  orange: 5,
}); // false

validator.name === "{ [string]: number }"; // true
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shape` | `Object` | The validators, which will validate the keys and values of the given object. |
| `shape.keys` | [`ValidatorOrConstructor`](modules.md#validatororconstructor)<`string`\> | - |
| `shape.values` | [`ValidatorOrConstructor`](modules.md#validatororconstructor)<`T`\> | - |

#### Returns

[`Validator`](classes/Validator.md)<`Record`<`string`, `T`\>\>

A `Validator` that checks if the given value matches the provided object shape.

Accpets not-null objects, where all `keys`
and `values` are accepted by the given shape `validators`.
Similar in concept as TypeScript's `{[keys: string]: number}` type annotations.

`validator.name`: `"{ [<keyType>]: <valueType> }"`

#### Defined in

[src/validators.ts:290](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L290)

___

### TOr

▸ **TOr**<`A`, `B`, `T`\>(`validatorA`, `validatorB`, ...`others`): [`Validator`](classes/Validator.md)<`A` \| `B` \| [`ValidatorType`](modules.md#validatortype)<[`ArrayType`](modules.md#arraytype)<`T`\>\>\>

Validates if at least one type criteria is met.

**`example`**
```ts
const validator = TOr(TNumber, TString);
validator.isValid(1); // true
validator.isValid("foo"); // true
validator.isValid(true); // false
validator.name === "number | string"; // true
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `A` |
| `B` | `B` |
| `T` | extends [`ValidatorOrConstructor`](modules.md#validatororconstructor)<`unknown`\>[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `validatorA` | [`ValidatorOrConstructor`](modules.md#validatororconstructor)<`A`\> |
| `validatorB` | [`ValidatorOrConstructor`](modules.md#validatororconstructor)<`B`\> |
| `...others` | `T` |

#### Returns

[`Validator`](classes/Validator.md)<`A` \| `B` \| [`ValidatorType`](modules.md#validatortype)<[`ArrayType`](modules.md#arraytype)<`T`\>\>\>

A `Validator` that is similar in concept as the `|` operator in TypeScript.
Accepts a value when it was accepted by at least one of the `validators`.

`validator.name`: `"<typeA> | <typeB>"`

#### Defined in

[src/validators.ts:355](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L355)

___

### TStringBase64

▸ **TStringBase64**(`options`): [`Validator`](classes/Validator.md)<`string`\>

Validates if a string is a base64 encoded data.

**`example`**
```ts
const validator = TStringBase64({ urlSafe: true });
validator.isValid("foobar"); // false
validator.isValid("c29tZXRoaW5n"); // true
validator.name === "string(base64URL)"; // true
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.urlSafe` | `boolean` | If set to true, it will check if the string is bas64URL encoded |

#### Returns

[`Validator`](classes/Validator.md)<`string`\>

A `Validator` that accepts only strings that are base64 encoded.

`validator.name`: `"string(base64<?URL>)"`

#### Defined in

[src/validators.ts:452](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L452)

___

### TStringMatch

▸ **TStringMatch**(`patternName`, `regexp`): [`Validator`](classes/Validator.md)<`string`\>

Validates if a string matches a regexp.

**`example`**
```ts
const validator = TStringMatch("email", /^\S+@\S+$/);
validator.isValid("foo@bar.com"); // true
validator.isValid("foobar.com"); // false
validator.name === "string(email)"; // true
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `patternName` | `string` | Describes the regular expression in a user-readable manner. |
| `regexp` | `RegExp` | The regexp to use for validation of incoming values. |

#### Returns

[`Validator`](classes/Validator.md)<`string`\>

A `Validator` that accepts only strings that matches the given `regexp`.

`validator.name`: `"string(<regexpName>)"`

#### Defined in

[src/validators.ts:424](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L424)

___

### TStringOfLength

▸ **TStringOfLength**(`options`): [`Validator`](classes/Validator.md)<`string`\>

Validates if a string is in the given length range.

**`example`**
```ts
const validator = TStringOfLength({ minLength: 5 });
validator.isValid("1234"); // false
validator.isValid("123456789"); // true
validator.name === "string(minLength=5)"; // true
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.maxLength?` | `number` |
| `options.minLength?` | `number` |

#### Returns

[`Validator`](classes/Validator.md)<`string`\>

A `Validator` that accepts only strings, which is the given length.

`validator.name`: `"string(minLength=<minLength>,maxLength=<maxLength>)"`

#### Defined in

[src/validators.ts:478](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L478)

___

### TStringUUID

▸ **TStringUUID**(`options`): [`Validator`](classes/Validator.md)<`string`\>

Checks if the string is a valid UUID.

**`example`**
```ts
const validator = TStringUUID({ version: 4 })
TStringURL.isValid("foobar"); // false
TStringURL.isValid("936a0dd4-cf7f-497d-a0cd-7c891416c719"); // true
TStringURL.name === "string(UUID-v4)"; // true
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.version` | `UUIDVersion` | The uuid version (3 \| 4 \| 5 \| "3" \| "4" \| "5" \| "all") |

#### Returns

[`Validator`](classes/Validator.md)<`string`\>

A `Validator` which checks if the string is a valid UUID of the given `version`.

`validator.name`: `"string(UUID-v<version>)"`

#### Defined in

[src/validators.ts:655](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L655)

___

### TValidate

▸ **TValidate**<`T`\>(`name`, `isValid`): [`Validator`](classes/Validator.md)<`T`\>

Creates a custom `Validator` from the given params.

**`example`**
Defining a validator that validates if a number is bigger than 10:
```ts
const TBiggerThan10 = TValidate<number>(
  "number(bigger than 10)",
  (value) => typeof value === "number" && value > 10
);
```

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `never` | The type the created validator will guard.  > ⚠️ Don't forget to provide `T` type parameter! |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the type this validator will guard. |
| `isValid` | (`value`: `any`) => `boolean` | Callback function, decides if a given value is valid or not |

#### Returns

[`Validator`](classes/Validator.md)<`T`\>

#### Defined in

[src/validators.ts:51](https://github.com/davidkarolyi/tguard/blob/4afe72c/src/validators.ts#L51)
