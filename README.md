# tguard 💂

> Declarative type guarding system for TypeScript.

![CI](https://github.com/davidkarolyi/tguard/workflows/CI/badge.svg)
![codecov](https://codecov.io/gh/davidkarolyi/tguard/branch/main/graph/badge.svg?token=53LGJ96QQ0)

## Installation

```sh
npm install tguard
```

or

```sh
yarn add tguard
```

## Example Usage

```ts
import {
  TArray,
  TInteger,
  TObject,
  TString,
  TStringUUID,
  GuardedType,
} from "tguard";

// Let's define a User type as a Guard.
const TPost = TObject({
  id: TStringUUID,
  title: TString,
  body: TString,
});

const TUser = TObject({
  id: TStringUUID,
  name: TString,
  age: TInteger,
  posts: TArray(TPost),
});

// Note: If you don't want to define these types twice
// (once as a TypeScript type, once as a guard)
// you can infer it's guarded types with the `GuardedType` utility type:
type User = GuardedType<typeof TUser>;
type Post = GuardedType<typeof TPost>;

// We can use guards to validate if a given value is a valid 'User' type or not:
if (TUser.isValid(unknownValue)) {
  // TypeScript will know that `unknownValue` is 'User' in this block.
}

// Or try to cast a value to the User type:
try {
  const user = TUser.cast({ posts: ["Who am I?", "I am a user."] });
  // Type of `user` === {
  //    id: string,
  //    name: string,
  //    age: number,
  //    posts: Array<{id: string, title: string, body: string}>
  // }
} catch (error) {
  // error.message === 'Validation failed: Missing value at "id", expected type: string(UUID)'
}
```

## Motivation, Guarding Types Manually ❌

TypeScript does a static analysis to infer types, but won't provide any guarantees for runtime type safety.
These checks should be done by the developer manually.

Here is an example for that with using [type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates):

**❌ Without `tguard`**:

```ts
interface User {
  name: string;
  posts: string[];
}

function isUser(fetchedUser: any): fetchedUser is User {
  const user = fetchedUser as User;
  return typeof user.name === "string" && isStringArray(user.posts);
}

function isStringArray(array: any): array is string[] {
  if (!Array.isArray(array)) return false;
  for (const item of array) {
    if (typeof item !== "string") return false;
  }
  return true;
}
```

**✅ With `tguard`**

```ts
import { TObject, TString, TArray } from "tguard";

const TUser = TObject({
  name: TString,
  posts: TArray(TString),
});
```

## Guards

By convention, every guard's name starts with an upper-case `T`.
These are instances of the [Guard abstract class](classes/Guard.md) with a `name` field, `isValid` method, and a `cast` method.

### Built-in type guards:

#### Primitive `Guards`

- [TAny](/docs/modules.md#tany)
- [TAnyObject](/docs/modules.md#tanyobject)
- [TBigInt](/docs/modules.md#tbigint)
- [TBoolean](/docs/modules.md#tboolean)
- [TFunction](/docs/modules.md#tfunction)
- [TInteger](/docs/modules.md#tinteger)
- [TIntegerAsString](/docs/modules.md#tintegerasstring)
- [TNull](/docs/modules.md#tnull)
- [TNumber](/docs/modules.md#tnumber)
- [TNumberAsString](/docs/modules.md#tnumberasstring)
- [TString](/docs/modules.md#tstring)
- [TStringEmail](/docs/modules.md#tstringemail)
- [TStringISODate](/docs/modules.md#tstringisodate)
- [TStringJWT](/docs/modules.md#tstringjwt)
- [TStringMIMEType](/docs/modules.md#tstringmimetype)
- [TStringPhoneNumber](/docs/modules.md#tstringphonenumber)
- [TStringSemVer](/docs/modules.md#tstringsemver)
- [TStringURL](/docs/modules.md#tstringurl)
- [TStringUUID](/docs/modules.md#tstringuuid)
- [TUndefined](/docs/modules.md#tundefined)

#### Functions, returning a `Guard`

- [TAnd](/docs/modules.md#tand)
- [TArray](/docs/modules.md#tarray)
- [TConstant](/docs/modules.md#tconstant)
- [TNot](/docs/modules.md#tnot)
- [TObject](/docs/modules.md#tobject)
- [TObjectOfShape](/docs/modules.md#tobjectofshape)
- [TOr](/docs/modules.md#tor)
- [TStringBase64](/docs/modules.md#tstringbase64)
- [TStringMatch](/docs/modules.md#tstringmatch)
- [TStringWithLength](/docs/modules.md#tstringwithlength)
- [TValidate](/docs/modules.md#tvalidate)

## Defining Custom guards

You can define any custom Guard with [`TValidate`](/docs/modules.md#tvalidate).

Defining a guard that validates if a number is bigger than 10:

```ts
const TNumberBiggerThan10 = TValidate(
  "number(bigger than 10)",
  (value) => typeof value === "number" && value > 10
);
```

## Exported utility tpyes

- [GuardedType](/docs/modules.md#guardedtype)
- [SchemaType](/docs/modules.md#schematype)

## Tree shaking

All guards can be imported as a single module, which enables tree-shaking:

```ts
import TString from "tguard/guards/TString";
import { GuardedType } from "tguard/Guard";
```
