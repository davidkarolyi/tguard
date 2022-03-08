[tguard](README.md) / Exports

# tguard

## Table of contents

### Classes

- [Guard](classes/Guard.md)
- [ValidationError](classes/ValidationError.md)

### Type aliases

- [GuardedType](modules.md#guardedtype)
- [SchemaType](modules.md#schematype)

### Variables

- [TAny](modules.md#tany)
- [TAnyObject](modules.md#tanyobject)
- [TBigInt](modules.md#tbigint)
- [TBoolean](modules.md#tboolean)
- [TFunction](modules.md#tfunction)
- [TInteger](modules.md#tinteger)
- [TIntegerAsString](modules.md#tintegerasstring)
- [TNull](modules.md#tnull)
- [TNumber](modules.md#tnumber)
- [TNumberAsString](modules.md#tnumberasstring)
- [TString](modules.md#tstring)
- [TStringEmail](modules.md#tstringemail)
- [TStringISODate](modules.md#tstringisodate)
- [TStringJWT](modules.md#tstringjwt)
- [TStringMIMEType](modules.md#tstringmimetype)
- [TStringPhoneNumber](modules.md#tstringphonenumber)
- [TStringSemVer](modules.md#tstringsemver)
- [TStringURL](modules.md#tstringurl)
- [TStringUUID](modules.md#tstringuuid)
- [TUndefined](modules.md#tundefined)

### Functions

- [TAnd](modules.md#tand)
- [TArray](modules.md#tarray)
- [TConstant](modules.md#tconstant)
- [TNot](modules.md#tnot)
- [TObject](modules.md#tobject)
- [TObjectOfShape](modules.md#tobjectofshape)
- [TOr](modules.md#tor)
- [TStringBase64](modules.md#tstringbase64)
- [TStringMatch](modules.md#tstringmatch)
- [TStringWithLength](modules.md#tstringwithlength)
- [TValidate](modules.md#tvalidate)

## Type aliases

### GuardedType

Ƭ **GuardedType**<`C`\>: `C` extends [`Guard`](classes/Guard.md)<infer T\> ? `T` : `unknown`

Infers the type, that the given `Guard` guards.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`Guard`](classes/Guard.md)<`unknown`\> |

#### Defined in

[src/Guard.ts:20](https://github.com/davidkarolyi/tguard/blob/9309bca/src/Guard.ts#L20)

___

### SchemaType

Ƭ **SchemaType**<`C`\>: `C` extends [`Guard`](classes/Guard.md)<`unknown`\> ? [`GuardedType`](modules.md#guardedtype)<`C`\> : `C` extends { `[fieldName: string]`: `Schema`;  } ? { [Property in keyof C]: SchemaType<C[Property]\> } : `unknown`

Infers the type, that the given `Schema` represents.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `Schema` |

#### Defined in

[src/guards/TObject/types.ts:8](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TObject/types.ts#L8)

## Variables

### TAny

• `Const` **TAny**: [`Guard`](classes/Guard.md)<`any`\>

Guard that accepts any value.

`guard.name`: `"any"`

#### Defined in

[src/guards/TAny/index.ts:8](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TAny/index.ts#L8)

___

### TAnyObject

• `Const` **TAnyObject**: [`Guard`](classes/Guard.md)<`Object`\>

Primitive guard that only accepts objects.
Does not accept null.

`guard.name`: `"object"`

#### Defined in

[src/guards/TAnyObject/index.ts:9](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TAnyObject/index.ts#L9)

___

### TBigInt

• `Const` **TBigInt**: [`Guard`](classes/Guard.md)<`BigInt`\>

Primitive guard that only accepts the JS type `bigint`.

`guard.name`: `"bigint"`

#### Defined in

[src/guards/TBigInt/index.ts:8](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TBigInt/index.ts#L8)

___

### TBoolean

• `Const` **TBoolean**: [`Guard`](classes/Guard.md)<`boolean`\>

Primitive guard that only accepts the JS type `boolean`.

`guard.name`: `"boolean"`

#### Defined in

[src/guards/TBoolean/index.ts:8](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TBoolean/index.ts#L8)

___

### TFunction

• `Const` **TFunction**: [`Guard`](classes/Guard.md)<`Function`\>

Primitive guard that only accepts the JS type `function`.

`guard.name`: `"function"`

#### Defined in

[src/guards/TFunction/index.ts:8](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TFunction/index.ts#L8)

___

### TInteger

• `Const` **TInteger**: [`Guard`](classes/Guard.md)<`number`\>

Guard that accepts whole numbers.

`guard.name`: `"integer"`

**`example`**
 ```ts
TInteger.isValid("15"); // false
TInteger.isValid(15.223); // false
TInteger.isValid(15); // true
```

#### Defined in

[src/guards/TInteger/index.ts:15](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TInteger/index.ts#L15)

___

### TIntegerAsString

• `Const` **TIntegerAsString**: [`Guard`](classes/Guard.md)<`string`\>

Guard that accepts strings, which can be parsed as a valid integer.

`guard.name`: `"integer(as a string)"`

**`example`**
 ```ts
TIntegerAsString.isValid("15.223"); // false
TIntegerAsString.isValid(15); // false
TIntegerAsString.isValid("15"); // true
```

#### Defined in

[src/guards/TIntegerAsString/index.ts:16](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TIntegerAsString/index.ts#L16)

___

### TNull

• `Const` **TNull**: [`Guard`](classes/Guard.md)<``null``\>

Guard that only accepts `null`.

`guard.name`: `"null"`

#### Defined in

[src/guards/TNull/index.ts:8](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TNull/index.ts#L8)

___

### TNumber

• `Const` **TNumber**: [`Guard`](classes/Guard.md)<`number`\>

Primitive guard that only accepts numbers.
Not accepts NaN.

`guard.name`: `"number"`

#### Defined in

[src/guards/TNumber/index.ts:9](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TNumber/index.ts#L9)

___

### TNumberAsString

• `Const` **TNumberAsString**: [`Guard`](classes/Guard.md)<`string`\>

Guard that accepts strings, which represents a valid number.

`guard.name`: `"number(as a string)"`

**`example`**
 ```ts
TNumberAsString.isValid("abcd"); // false
TNumberAsString.isValid(15.223); // false
TNumberAsString.isValid("15.223"); // true
```

#### Defined in

[src/guards/TNumberAsString/index.ts:15](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TNumberAsString/index.ts#L15)

___

### TString

• `Const` **TString**: [`Guard`](classes/Guard.md)<`string`\>

Primitive guard that only accepts the JS type `string`.

`guard.name`: `string`

#### Defined in

[src/guards/TString/index.ts:8](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TString/index.ts#L8)

___

### TStringEmail

• `Const` **TStringEmail**: [`Guard`](classes/Guard.md)<`string`\>

A `Guard` which validates if a string is a valid email.

`guard.name`: `"string(email)"`

**`example`**
```ts
TStringEmail.isValid("1234"); // false
TStringEmail.isValid("foo@bar.com"); // true
TStringEmail.name === "string(email)"; // true
```

#### Defined in

[src/guards/TStringEmail/index.ts:16](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TStringEmail/index.ts#L16)

___

### TStringISODate

• `Const` **TStringISODate**: [`Guard`](classes/Guard.md)<`string`\>

A `Guard` which validates if a string is a valid ISO date string.

`guard.name`: `"string(date)"`

**`example`**
```ts
TStringISODate.isValid("1234"); // false
TStringISODate.isValid("2022-03-06T22:01:41.160Z"); // true
TStringISODate.name === "string(date)"; // true
```

#### Defined in

[src/guards/TStringISODate/index.ts:16](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TStringISODate/index.ts#L16)

___

### TStringJWT

• `Const` **TStringJWT**: [`Guard`](classes/Guard.md)<`string`\>

A `Guard` which validates if a string is a valid JSON Web Token.

`guard.name`: `"string(JWT)"`

**`example`**
```ts
TStringJWT.isValid("1234"); // false
TStringJWT.isValid("something.fooo.bar"); // true
TStringJWT.name === "string(JSON)"; // true
```

#### Defined in

[src/guards/TStringJWT/index.ts:16](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TStringJWT/index.ts#L16)

___

### TStringMIMEType

• `Const` **TStringMIMEType**: [`Guard`](classes/Guard.md)<`string`\>

A `Guard` which validates if a string is a valid [MIME type](https://en.wikipedia.org/wiki/Media_type).

`guard.name`: `"string(MIME type)"`

**`example`**
```ts
TStringMIMEType.isValid("foobar"); // false
TStringMIMEType.isValid("application/json"); // true
TStringMIMEType.name === "string(MIME type)"; // true
```

#### Defined in

[src/guards/TStringMIMEType/index.ts:16](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TStringMIMEType/index.ts#L16)

___

### TStringPhoneNumber

• `Const` **TStringPhoneNumber**: [`Guard`](classes/Guard.md)<`string`\>

A `Guard` which validates if a string is a valid phone number.
(all locale formats are accepted)

`guard.name`: `"string(phone number)"`

**`example`**
```ts
TStringPhoneNumber.isValid("foobar"); // false
TStringPhoneNumber.isValid("061555555"); // true
TStringPhoneNumber.name === "string(phone number)"; // true
```

#### Defined in

[src/guards/TStringPhoneNumber/index.ts:17](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TStringPhoneNumber/index.ts#L17)

___

### TStringSemVer

• `Const` **TStringSemVer**: [`Guard`](classes/Guard.md)<`string`\>

A `Guard` which checks if the string is a Semantic Versioning Specification (SemVer).

`guard.name`: `"string(SemVer)"`

**`example`**
```ts
TStringSemVer.isValid("foobar"); // false
TStringSemVer.isValid("1.0.4"); // true
TStringSemVer.name === "string(SemVer)"; // true
```

#### Defined in

[src/guards/TStringSemVer/index.ts:16](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TStringSemVer/index.ts#L16)

___

### TStringURL

• `Const` **TStringURL**: [`Guard`](classes/Guard.md)<`string`\>

A `Guard` which checks if the string is a valid URL.

`guard.name`: `"string(URL)"`

**`example`**
```ts
TStringURL.isValid("foobar"); // false
TStringURL.isValid("foobar.com"); // true
TStringURL.name === "string(URL)"; // true
```

#### Defined in

[src/guards/TStringURL/index.ts:16](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TStringURL/index.ts#L16)

___

### TStringUUID

• `Const` **TStringUUID**: [`Guard`](classes/Guard.md)<`string`\>

Checks if the string is a valid UUID v4.

**`returns`**
A `Guard` which checks if the string is a valid v4 UUID.

`guard.name`: `"string(UUID)"`

**`example`**
```ts
TStringUUID.isValid("foobar"); // false
TStringUUID.isValid("936a0dd4-cf7f-497d-a0cd-7c891416c719"); // true
TStringUUID.name === "string(UUID)"; // true
```

#### Defined in

[src/guards/TStringUUID/index.ts:19](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TStringUUID/index.ts#L19)

___

### TUndefined

• `Const` **TUndefined**: [`Guard`](classes/Guard.md)<`undefined`\>

Primitive guard that only accepts the JS type `undefined`.

`guard.name`: `"undefined"`

#### Defined in

[src/guards/TUndefined/index.ts:8](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TUndefined/index.ts#L8)

## Functions

### TAnd

▸ **TAnd**<`A`, `B`\>(`guardA`, `guardB`): [`Guard`](classes/Guard.md)<`A` & `B`\>

Validates if criterias of two types are both met.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `guardA` | [`Guard`](classes/Guard.md)<`A`\> |
| `guardB` | [`Guard`](classes/Guard.md)<`B`\> |

#### Returns

[`Guard`](classes/Guard.md)<`A` & `B`\>

A `Guard` that is similar in concept as the `&` operator in TypeScript.
Accepts a value when it was accepted by both `guardA` and `guardB`.

`guard.name`: `"<typeA> & <typeB>"`

#### Defined in

[src/guards/TAnd/index.ts:13](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TAnd/index.ts#L13)

___

### TArray

▸ **TArray**<`T`\>(`guard`, `options?`): [`Guard`](classes/Guard.md)<`T`[]\>

Validates an array of elements.

**`example`**
```ts
const guard = TArray(TNumber);
guard.isValid([1, 2, 3]); // true
guard.isValid([1, 2, "3"]); // false
guard.name === "number[]"; // true
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guard` | [`Guard`](classes/Guard.md)<`T`\> | The guard, which validates the elements of the array. |
| `options?` | `Object` | - |
| `options.maxLength?` | `number` | The array can't be longer than this. |
| `options.minLength?` | `number` | The array must be at least this long. |

#### Returns

[`Guard`](classes/Guard.md)<`T`[]\>

A `Guard` that checks if the given value is an array of the given type.

`guard.name`: `"<type>[](minLength:<minLength>,maxLength:<maxLength>)"`

#### Defined in

[src/guards/TArray/index.ts:25](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TArray/index.ts#L25)

___

### TConstant

▸ **TConstant**<`T`\>(`constant`): [`Guard`](classes/Guard.md)<`T`\>

Validates equality to a literal value.

**`example`**
```ts
const guard = TConstant("foo")

guard.isValid("foobar"); // false
guard.isValid("bar"); // false
guard.isValid("foo"); // true

guard.name === 'constant("foo")'; // true
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

[`Guard`](classes/Guard.md)<`T`\>

A `Guard` which checks if the given value is equals to the `constant` literal.

`guard.name`: `"constant(<constant>)"`

#### Defined in

[src/guards/TConstant/index.ts:27](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TConstant/index.ts#L27)

___

### TNot

▸ **TNot**<`T`\>(`guard`): [`Guard`](classes/Guard.md)<`Exclude`<`any`, `T`\>\>

Negates a type criteria.

**`example`**
```ts
const guard = TNot(TNumber);
guard.isValid(1); // false
guard.isValid("foo"); // true
guard.name === "!number"; // true
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guard` | [`Guard`](classes/Guard.md)<`T`\> | The guard, which will be negated. |

#### Returns

[`Guard`](classes/Guard.md)<`Exclude`<`any`, `T`\>\>

A `Guard` that accepts a value when it was **not** accepted by the given guard.

`guard.name`: `"!<type>"`

#### Defined in

[src/guards/TNot/index.ts:22](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TNot/index.ts#L22)

___

### TObject

▸ **TObject**<`T`\>(`schema`): [`Guard`](classes/Guard.md)<[`SchemaType`](modules.md#schematype)<`T`\>\>

It will validate that the given values is matching the object schema.

**`example`**
```ts
const TUser = TObject({
  id: TInteger,
  name: TString,
  cart: {
    mangos: TInteger,
    avocados: TInteger,
  },
});

TUser.isValid({id: 1, name: "John" cart: {apples: 1}}) // false
TUser.isValid({id: 1, name: "John" cart: {mangos: 1, avocados: 2}}) // true
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ObjectSchema` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | `T` | Is a tree of guards. (Just a normal JS object, but it with `Guard` values) |

#### Returns

[`Guard`](classes/Guard.md)<[`SchemaType`](modules.md#schematype)<`T`\>\>

A `Guard`.

#### Defined in

[src/guards/TObject/index.ts:27](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TObject/index.ts#L27)

___

### TObjectOfShape

▸ **TObjectOfShape**<`T`\>(`shape`): [`Guard`](classes/Guard.md)<`Record`<`string`, `T`\>\>

Validates the shape of an object.

**`example`**
 ```ts
const guard = TObjectShape({
  keys: TString,
  values: TNumber,
});

guard.isValid({
  avocado: 2,
  orange: 5,
}); // true

guard.isValid({
  avocado: "green",
  orange: 5,
}); // false

guard.name === "{ [string]: number }"; // true
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shape` | `Object` | The guards, which will validate the keys and values of the given object. |
| `shape.keys` | [`Guard`](classes/Guard.md)<`string`\> | - |
| `shape.values` | [`Guard`](classes/Guard.md)<`T`\> | - |

#### Returns

[`Guard`](classes/Guard.md)<`Record`<`string`, `T`\>\>

A `Guard` that checks if the given value matches the provided object shape.

Accpets not-null objects, where all `keys`
and `values` are accepted by the given shape `guards`.
Similar in concept as TypeScript's `{[keys: string]: number}` type annotations.

`guard.name`: `"{ [<keyType>]: <valueType> }"`

#### Defined in

[src/guards/TObjectOfShape/index.ts:39](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TObjectOfShape/index.ts#L39)

___

### TOr

▸ **TOr**<`A`, `B`, `T`\>(`guardA`, `guardB`, ...`others`): [`Guard`](classes/Guard.md)<`A` \| `B` \| [`GuardedType`](modules.md#guardedtype)<`ArrayType`<`T`\>\>\>

Validates if at least one type criteria is met.

**`example`**
```ts
const guard = TOr(TNumber, TString);
guard.isValid(1); // true
guard.isValid("foo"); // true
guard.isValid(true); // false
guard.name === "number | string"; // true
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `A` |
| `B` | `B` |
| `T` | extends [`Guard`](classes/Guard.md)<`unknown`\>[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `guardA` | [`Guard`](classes/Guard.md)<`A`\> |
| `guardB` | [`Guard`](classes/Guard.md)<`B`\> |
| `...others` | `T` |

#### Returns

[`Guard`](classes/Guard.md)<`A` \| `B` \| [`GuardedType`](modules.md#guardedtype)<`ArrayType`<`T`\>\>\>

A `Guard` that is similar in concept as the `|` operator in TypeScript.
Accepts a value when it was accepted by at least one of the `guards`.

`guard.name`: `"<typeA> | <typeB>"`

#### Defined in

[src/guards/TOr/index.ts:22](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TOr/index.ts#L22)

___

### TStringBase64

▸ **TStringBase64**(`options`): [`Guard`](classes/Guard.md)<`string`\>

Validates if a string is a base64 encoded data.

**`example`**
```ts
const guard = TStringBase64({ urlSafe: true });
guard.isValid("foobar"); // false
guard.isValid("c29tZXRoaW5n"); // true
guard.name === "string(base64URL)"; // true
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.urlSafe` | `boolean` | If set to true, it will check if the string is bas64URL encoded |

#### Returns

[`Guard`](classes/Guard.md)<`string`\>

A `Guard` that accepts only strings that are base64 encoded.

`guard.name`: `"string(base64<?URL>)"`

#### Defined in

[src/guards/TStringBase64/index.ts:22](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TStringBase64/index.ts#L22)

___

### TStringMatch

▸ **TStringMatch**(`patternName`, `regexp`): [`Guard`](classes/Guard.md)<`string`\>

Validates if a string matches a regexp.

**`example`**
```ts
const guard = TStringMatch("email", /^\S+@\S+$/);
guard.isValid("foo@bar.com"); // true
guard.isValid("foobar.com"); // false
guard.name === "string(email)"; // true
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `patternName` | `string` | Describes the regular expression in a user-readable manner. |
| `regexp` | `RegExp` | The regexp to use for validation of incoming values. |

#### Returns

[`Guard`](classes/Guard.md)<`string`\>

A `Guard` that accepts only strings that matches the given `regexp`.

`guard.name`: `"string(<regexpName>)"`

#### Defined in

[src/guards/TStringMatch/index.ts:23](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TStringMatch/index.ts#L23)

___

### TStringWithLength

▸ **TStringWithLength**(`options`): [`Guard`](classes/Guard.md)<`string`\>

Validates if a string is in the given length range.

**`example`**
```ts
const guard = TStringOfLength({ minLength: 5 });
guard.isValid("1234"); // false
guard.isValid("123456789"); // true
guard.name === "string(minLength=5)"; // true
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.maxLength?` | `number` |
| `options.minLength?` | `number` |

#### Returns

[`Guard`](classes/Guard.md)<`string`\>

A `Guard` that accepts only strings, which is the given length.

`guard.name`: `"string(minLength=<minLength>,maxLength=<maxLength>)"`

#### Defined in

[src/guards/TStringWithLength/index.ts:23](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TStringWithLength/index.ts#L23)

___

### TValidate

▸ **TValidate**<`T`\>(`name`, `isValid`): [`Guard`](classes/Guard.md)<`T`\>

Creates a custom `Guard` from the given params.

**`example`**
Defining a guard that validates if a number is bigger than 10:
```ts
const TBiggerThan10 = TValidate<number>(
  "number(bigger than 10)",
  (value) => typeof value === "number" && value > 10
);
```

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `never` | The type the created guard will guard.  > ⚠️ Don't forget to provide `T` type parameter! |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the type this guard will guard. |
| `isValid` | (`value`: `any`) => `boolean` | Callback function, decides if a given value is valid or not |

#### Returns

[`Guard`](classes/Guard.md)<`T`\>

#### Defined in

[src/guards/TValidate/index.ts:22](https://github.com/davidkarolyi/tguard/blob/9309bca/src/guards/TValidate/index.ts#L22)
