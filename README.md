# tguard 💂

> Declarative type guarding system for TypeScript

![CI](https://img.shields.io/github/workflow/status/davidkarolyi/tguard/CI/main)
![codecov](https://codecov.io/gh/davidkarolyi/tguard/branch/main/graph/badge.svg?token=53LGJ96QQ0)
![License](https://badgen.net/npm/license/tguard)
![Version](https://badgen.net/npm/v/tguard)
![Dependencies](https://badgen.net/david/dep/davidkarolyi/tguard)

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
import { Guard, TString, TArray } from "tguard";

interface User {
  name: string;
  posts: string[];
}

const UserGuard = new Guard<User>({
  name: TString,
  posts: TArray(TString),
});

// TypeScript infers john's type as 'any'
const john: any = {
  name: "John",
  posts: ["Who am I?", "I am a user."],
};

if (UserGuard.accepts(john)) {
  // TypeScript infers john's type as 'User' in this block
  const questions = john.posts.filter((post) => post.endsWith("?"));
}
```

## Guarding Types Manually

TypeScript does a static analysis to infer types, but won't provide any guarantees for runtime type safety.
These checks should be done by the developer manually via [type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types).

A use-case of a type guard can be when your code fetches a resource with an HTTP request,
for example a user's data from the database.

This happens in runtime, so TypeScript can't handle the fetched user as a specific type,
so it will implicitly infer it's type to be `any`.

To be able to work with the response as a predefined `User` type,
you should manually check if the response is indeed a valid `User`.

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

or by using [type predicates](https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates)

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

**By using `tguard`, the same logic can be expressed as:**

```ts
const UserGuard = new Guard<User>({
  name: TString,
  posts: TArray(TString),
});
```

## `Guard` class

### Creation

To define a new type guard, use the `Guard` class's constructor,
which accepts a `T` generic type and a [GuardDefinition](#guard-definition) as the parameter.

```ts
import { Guard, TString, TArray } from "tguard";

// Using a single type validator
const StringGuard = new Guard<string>(TString);

// Using an object definition
const UserGuard = new Guard<User>({
  name: TString,
  posts: TArray(TString),
});
```

### Instance methods

**`accepts(value: any) => booelan`**

Returns if the given value is a valid type `T`.

If it is, it will predicate the type of value to `T`, using TypeScript's built-in [type predicates](https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates) feature.

> Note that this will only work if you provided the type `T` in the `Guard` construction.
> Otherwise TypeScript can't figure out the type of `value`, and `value`'s type will remain the same.

```ts
const user: any = {
  name: "Foo",
  posts: ["foobar", "baz"],
};

if (UserGuard.accepts(user)) {
  // you can use 'user' as type 'User' in this block
} else {
  // do something if 'user' is not a valid 'User'
}
```

## Guard Definition

`GuardDefinition` can be either a single [Validator](#validators) or a `GuardDefinitionObject`.

`GuardDefinitionObject` is a plain JavaScript object, with the only constraint that all fields should be
a [Validator](#validators) function or an other `GuardDefinitionObject`.

```ts
import { GuardDefinition, TBoolean, TString, TNumber } from "tguard";

// using a single validator
const stringDefinition: GuardDefinition = TString;

// using a GuardDefinitionObject
const userDefinition: GuardDefinition = {
  admin: TBoolean,
  name: TString,
  age: TNumber,
  stats: {
    numOfPosts: TNumber,
  },
};
```

## Validators

Validators are just functions, with the following signature: `(value: any) => boolean`.
It will return if the given value is eligible as the type that the validator meant to validate.

Validators are prefixed with the letter `T`, to indicate that they are representing a type of some sort,
and to differentiate them from the built-in vanilla JavaScript types, like `Array` or `String`.

### `TAny`

Returns `true` for every value.

### `TString`

Returns `true` if the value is of type `string`.

### `TBigInt`

Returns `true` if the value is of type `bigint`.

### `TBoolean`

Returns `true` if the value is of type `boolean`.

### `TFunction`

Returns `true` if the value is of type `function`.

### `TNull`

Returns `true` if the value is `null`.

### `TNumber`

Returns `true` if the value is of type `number`.

### `TObject`

Returns `true` if the value is of type `object` (or `null`).

### `TUndefined`

Returns `true` if the value is of type `undefined`.

## Compound Validators

A function that returns a [Validator](#validators), called a compound validator.

### `TArray(validator: Validator)`

Returns `true` if the value is an `array` of the type validated by the given `validator`.

```ts
const value: any = [1, 2, 3];
const validator = TArray(TNumber);

console.log(validator(value)); // true
```

### `TGuard(guard: Guard)`

Returns `true` if the value is accepted by the given [guard](#guard-class)

```ts
interface Product {
  id: number;
}

const ProductGuard = new Guard<Product>({
  id: TNumber,
});

const validator = TArray(TGuard(ProductGuard));
const products: any = [{ id: 1 }, { id: 2 }, { id: 3 }];

console.log(validator(products)); // true
```

### `TDefinition(definition: GuardDefinition)`

Returns `true` if the value is valid according to the given [guard definition](#guard-definition).

```ts
const validator = TArray(
  TDefinition({
    id: TNumber,
  })
);
const products: any = [{ id: 1 }, { id: 2 }, { id: 3 }];

console.log(validator(products)); // true
```

### `TObjectOfShape(shape: { keys: Validator, values: Validator,})`

Returns true if the value is a not-null object and
all keys and values are accepted by the given shape `validators`.
Similar in mind as TypeScript's `{[keys: string]: number}` type annotations.

```ts
const validator = TObjectShape({
  keys: TString,
  values: TNumber,
});

const order = {
  avocado: 2,
  orange: 5,
};

console.log(validator(order)); // true
```

## Logical Validators

These are [compound validators](#compound-validators), representing a logical type definition.
Similar in concept as the `|` and `&` operators in TypeScript.

### `TAnd(...validators: Validator[])`

Returns `true` if the value is accepted by all given `validators`.

### `TOr(...validators: Validator[])`

Returns `true` if the value is accepted by at least one of the `validators`.

### `TNot(validator: Validator)`

Returns `true` if the value is **not** accepted by the given validator.

## Custom Validators

You can define any custom [validator](#validators) or [compound validator](#compound-validators) until
call signatures are matching.

### Examples

Defining an email validator:

```ts
const TEmail = (value: any) => typeof value === string && value.includes("@");

const EmailGuard = new Guard<string>(TEmail);

const email: any = "foo@bar.com";

if (EmailGuard.accepts(email)) {
  // you can use 'email' as type 'string' in this block
} else {
  // do something if 'email' is not a valid email
}
```

Implementation of the built-in `TArray` [compound validator](#compound-validators):

```ts
const TArray = (validator: Validator) => (value: any) => {
  if (!Array.isArray(value)) return false;
  for (const item of value) {
    if (!validator(item)) return false;
  }
  return true;
};
```
