# tguard 💂

> Declarative type guarding system for TypeScript

![CI](https://github.com/davidkarolyi/tguard/workflows/CI/badge.svg)
![codecov](https://codecov.io/gh/davidkarolyi/tguard/branch/main/graph/badge.svg?token=53LGJ96QQ0)
![dependencies](https://badgen.net/david/dep/davidkarolyi/tguard)

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
import { guard, TString, TArray } from "tguard";

interface User {
  name: string;
  posts: string[];
}

const isUser = guard<User>({
  name: TString,
  posts: TArray(TString),
});

// TypeScript infers john's type as 'any'
const john: any = {
  name: "John",
  posts: ["Who am I?", "I am a user."],
};

if (isUser(john)) {
  // TypeScript infers john's type as 'User' in this block

  // So, for example you can use array methods on posts,
  // because it's recognised as 'string[]', not 'any'
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
import { guard, TString, TArray } from "tguard";

const isUser = guard<User>({
  name: TString,
  posts: TArray(TString),
});
```

## Create guards

To define a new type guard, use the `guard<T>(definition: GuardDefinition)` function,
which accepts a `T` generic type and a [GuardDefinition](#guard-definition) as the parameter.

```ts
import { guard, TString, TArray } from "tguard";

// Using a single type validator
const isString = guard<string>(TString);

// Using an object definition
const isUser = guard<User>({
  name: TString,
  posts: TArray(TString),
});
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

You can also reuse your existing guards in guard definition, to learn more about this, check out the section about [reusing guards](#reusing-guards).

## Type Predicate Functions

The `guard<T>` function returns a [type predicate function](https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates), with the following signature:

```ts
(value: any) => value is T:
```

These are special functions in TypeScript, not only returns if the given value is a valid type `T`,
but it will predicate the type of value to `T` if it's returned true.

So you can use `isUser` type predicate function like this:

```ts
const user: any = {
  name: "Foo",
  posts: ["foobar", "baz"],
};

// isUser is a type predicate function
const isUser = guard<User>({
  name: TString,
  posts: TArray(TString),
});

if (isUser(user)) {
  // you can use 'user' as type 'User' in this block
} else {
  // do something if 'user' is not a valid 'User'
}
```

> Note that this will only work if you provided the type `T` in the `guard<T>` function.
> Otherwise TypeScript can't figure out the type of `value`, and `value`'s type will remain untouched.

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

const isEmail = guard<string>(TEmail);

const email: any = "foo@bar.com";

if (isEmail(email)) {
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

## Type Predicates vs Validators

Notice that a [type predicate function](#type-predicate-functions) and a [validator](#validators)'
function signature is very similar.

```ts
// type predicate function
(value: any) => any is T

// validator function
(value: any) => boolean
```

As you saw in all examples, we're using a naming convention of prefixing every validator with a `T`,
and type predicate functions with `is` or `has` to explicitly differentiate them.

So both returns a `boolean`, but the validator function won't help TypeScript figuring out
the type of `value`, while the type predicate function will.

**We can say that every `type predicate function` is a `validator` as well**, but not visa-versa.

### Reusing guards

As a consequence we can use type predicates as validators in the [guard definition](#guard-definition):

```ts
import { guard, TString, TArray } from "tguard";

interface User {
  name: string;
  posts: Post[];
}

interface Post {
  header: string;
  body: string;
}

const isPost = guard<Post>({
  header: TString,
  body: TString,
});

const isUser = guard<User>({
  name: TString,
  body: TArray(isPost),
});
```
