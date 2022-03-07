tguard / [Exports](modules.md)

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
import { Guard, TString, TArray, TStringUUID, GuardedType } from "tguard";

// 1. Here you have some TypeScript types in your program:
interface User {
  id: string;
  name: string;
  posts: Array<Post>;
}

interface Post {
  id: string;
  title: string;
  body: string;
}

// 2. Unfortunatelly these types are only exist in TypeScript world.
// So let's represent those types as type guards:
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
// (once as an interface, once as a guard):
type User = GuardedType<typeof TUser>;
type Post = GuardedType<typeof TPost>;

// 3. We have an unknown value, that we fetched from an external API,
// TypeScript will implicitly infer it as "any" type:
const john: any = {
  name: "John",
  posts: ["Who am I?", "I am a user."],
};

// 4. Validate if John is a valid 'User' type or not:
if (TUser.isValid(john)) {
  // TypeScript will infer John's type as 'User' in this block.
}

// 5. Or try to cast a value to the User type:
try {
  const user = TUser.cast({ posts: ["Who am I?", "I am a user."] });
  // Type of user is User
} catch (error) {
  // error.message === 'Validation failed: Missing value at "id", expected type: string(UUID-v4)'
}
```

## Motivation, Guarding Types Manually ❌

TypeScript does a static analysis to infer types, but won't provide any guarantees for runtime type safety.
These checks should be done by the developer manually.

A use-case of a type guard can be when your code fetches a resource with an HTTP request,
for example a user's data from the database.

This happens in runtime, so TypeScript can't handle the fetched user as a specific type,
so it will implicitly infer it's type to be `any`.

To be able to work with the response as a predefined `User` type,
you should manually check if the response is indeed a valid `User`, field by field, value by value.

Here is an example for that:

```ts
interface User {
  name: string;
}

// fetch user from database
const fetchedUser: any = { name: "Foo" };

// type assertion
const user = fetchedUser as User;

// checking all field's type
if (typeof fetchedUser.name === "string") {
  console.log("My name is", fetchedUser.name);
}
```

or by using [type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)

```ts
function isUser(fetchedUser: any): fetchedUser is User {
  return typeof (fetchedUser as User).name === "string";
}

const fetchedUser: any = { name: "Foo" };

if (isUser(fetchedUser)) {
  console.log("My name is", fetchedUser.name);
}
```

As the `User` type gets more complex these checks can grow in complexity as well,
resulting in messy guarding functions polluting the actual code.

Let's just introduce a new `posts` field to the `User` type:

```ts
interface User {
  name: string;
  posts: string[];
}
```

The guarding code you should write would evolve to this:

```ts
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

Imagine the amount of guarding code you should write for types with more fields or deeply nested objects.

`tguard` offers a declarative approach to achieve the same functionality, without complex manual type guarding.

**✅ By using `tguard`, the same logic can be expressed as:**

```ts
import { Guard, TString, TArray } from "tguard";

const TUser = new Guard({
  name: TString,
  posts: TArray(TString),
});
```

## Create guards

To define a new type guard, use the `Guard` class,
which accepts a [Schema](#schema) as the parameter.

```ts
import { Guard, TString, TArray, TNumber } from "tguard";

// The schema can be a single Validator or Guard
new Guard(TString);

// Or an object of Validators/Guards
new Guard({
  name: TString,
  posts: TArray(TString),
  cart: {
    bananas: TNumber,
    mangos: TNumber,
  },
});
```

## Schema

`Schema` can be a single [Validator](#validators), or an object of [Validators](#validators).

```ts
import { Schema, TBoolean, TString, TNumber } from "tguard";

// using a single validator
const stringSchema: Schema = TString;

// using an object of validators
const userSchema: Schema = {
  admin: TBoolean,
  name: TString,
  age: TNumber,
  stats: {
    numOfPosts: TNumber,
  },
};
```

## Guard

### Type Predicate Functions

The `isValid` method is a [type predicate function](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates), with the following signature:

```ts
(value: any) => value is T:
```

These are special functions in TypeScript, not only returns if the given value is a valid type `T`,
but it will predicate the type of value to `T` if it's returned true.

So you can use `TUser.isValid` type predicate function like this:

```ts
const TUser = new Guard({
  name: TString,
  posts: TArray(TString),
});

const user: any = {
  name: "Foo",
  posts: ["foobar", "baz"],
};

// TUser.isValid is a type predicate function
if (TUser.isValid(user)) {
  // you can use 'user' as type 'User' in this block
} else {
  // do something if 'user' is not a valid 'User'
}
```

> Note that this is possible, because Guard could automatically figure out the guarded TypeScript type from the schema.

### Type Casting

The `cast` method will take any value and return the same value, but typed as the guarded type.
If the value isn't matching the schema, it will throw an `Error` containing the reason of failure.
Here is an example:

```ts
const TUser = new Guard({
  name: TString,
  cart: {
    total: TNumber,
    items: TArray(TString),
  },
});

const someValue: any = { name: "John", cart: { items: ["melon", "avocado"] } };

try {
  const user = TUser.cast(value);
  // typeof user === User
} catch (error) {
  error.message ===
    'Validation failed: Missing value at "cart.total", expected type: number'; // true
  error.path === ["cart", "total"]; // false because it's a reference 🙄, but you got the idea
  error.expectedType === "number"; //true
}
```

## Validators

Validators are instances of `Validator` abstract class that have an `isValid` method, and a `name` property, which represents the name of the guarded type.

> Note that this means that Guards are Validators as well. This means you can reuse them in other guard schemas.

For example:

```ts
TString.name === "string"; // true
TArray(TNumber).name === "number[]"; // true

const TUser = new Guard({ name: TString });
TUser.name === '{"name":"string"}'; //true

const TUserGroup = new Guard({ name: TString, users: TArray(TUser) });
```

Validators are prefixed with the letter `T`, to indicate that they are representing a type of some sort,
and to differentiate them from the built-in vanilla JavaScript types, like `Array` or `String`.

- [TAny](/docs/modules.md#tany)
- [TBigInt](/docs/modules.md#tbigint)
- [TBoolean](/docs/modules.md#tboolean)
- [TFunction](/docs/modules.md#tfunction)
- [TNull](/docs/modules.md#tnull)
- [TNumber](/docs/modules.md#tnumber)
- [TNumberAsString](/docs/modules.md#tnumberasstring)
- [TObject](/docs/modules.md#tobject)
- [TString](/docs/modules.md#tstring)
- [TStringEmail](/docs/modules.md#tstringemail)
- [TStringISODate](/docs/modules.md#tstringisodate)
- [TStringJSON](/docs/modules.md#tstringjson)
- [TStringJWT](/docs/modules.md#tstringjwt)
- [TStringMIMEType](/docs/modules.md#tstringmimetype)
- [TStringPhoneNumber](/docs/modules.md#tstringphonenumber)
- [TStringSemVer](/docs/modules.md#tstringsemver)
- [TStringURL](/docs/modules.md#tstringurl)
- [TUndefined](/docs/modules.md#tundefined)

## Compound Validators

A function that returns a [Validator](#validators), called a compound validator.

- [TAnd](/docs/modules.md#tand)
- [TArray](/docs/modules.md#tarray)
- [TNot](/docs/modules.md#tnot)
- [TObjectOfShape](/docs/modules.md#tobjectofshape)
- [TOr](/docs/modules.md#tor)
- [TStringBase64](/docs/modules.md#tstringbase64)
- [TStringMatch](/docs/modules.md#tstringmatch)
- [TStringOfLength](/docs/modules.md#tstringoflength)
- [TStringUUID](/docs/modules.md#tstringuuid)
- [TValidate](/docs/modules.md#tvalidate)

## Defining Custom Validators

You can define any custom [validator](#validators) or [compound validator](#compound-validators) with the [`TValidate`](/docs/modules.md#tvalidate) compound validator.

### Examples

Defining a validator that validates if a number is bigger than 10:

```ts
import { TValidate } from "tguard";

const TBiggerThan10 = TValidate(
  "number(bigger than 10)",
  (value) => typeof value === "number" && value > 10
);
```
