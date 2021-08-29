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
import { Guard, TString, TArray, GuardedType } from "tguard";

// 1. Here you have some TypeScript types in your program:
interface User {
  name: string;
  posts: Array<Post>;
}

interface Post {
  title: string;
  body: string;
}

// 2. Unfortunatelly these types are only exist in TypeScript world.
// So let's represent those types as type guards:
const TPost = new Guard({
  title: TString,
  body: TString,
});

const TUser = new Guard({
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
  // TypeScript will infer John's type as 'User' in this block
  // So this line won't throw any type errors:
  const questions = john.posts.filter((post) => post.title.endsWith("?"));
}

// 5. Or try to cast a value to the User type:
try {
  const user = TUser.cast({ posts: ["Who am I?", "I am a user."] });
  // typeof user == User
} catch (error) {
  error.message ===
    'Validation failed: Missing value at "name", expected type: string'; // true
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

`Schema` can be a single [Validator](#validators), a [Validator](#validators)'s constructor,
a Guard, or an object of these types.

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

## Guard<T>

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

> Note that this is possible, because Guard could automatically figure out the guarded type from the schema.

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

Validators are classes that have an `isValid` method, and a name property, which represents the name of the guarded type.

> Note that this means that Guards are Validators as well. This means you can reuse them in other guard schemas.

For example:

```ts
TString.name === "string"; // true
TArray(TNumber).name === "number[]"; // true

const TUser = new Guard({ name: TString });
TUser.name === '{"name":"string"}'; //true
```

Validators are prefixed with the letter `T`, to indicate that they are representing a type of some sort,
and to differentiate them from the built-in vanilla JavaScript types, like `Array` or `String`.

### `TAny`

Accepts every value.

### `TString`

Accepts the JS type `string`.

### `TBigInt`

Accepts the JS type `bigint`.

### `TBoolean`

Accepts the JS type `boolean`.

### `TFunction`

Accepts the JS type `function`.

### `TNull`

Accepts only `null`.

### `TNumber`

Accepts the JS type `number`.

### `TNumberAsString`

Accepts only `strings`, that can be converted to a valid `number`.

### `TObject`

Accepts the JS type `boolean`. (including `null`)

### `TUndefined`

Accepts the JS type `undefined`.

## Compound Validators

A function that returns a [Validator](#validators), called a compound validator.

### `TArray(validator: Validator)`

Accpets an `array` of the type validated by the given `validator`.

```ts
const validator = new TArray(TNumber);

validator.isValid([1, 2, 3]); // true
validator.isValid([1, 2, "3"]); // false
validator.name === "number[]"; // true
```

### `TObjectOfShape(shape: { keys: Validator, values: Validator })`

Accpets not-null objects where
all keys and values are accepted by the given shape `validators`.
Similar in mind as TypeScript's `{[keys: string]: number}` type annotations.

```ts
const validator = new TObjectShape({
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

### `TMatch(patternName: string, regexp: RegExp)`

Accepts strings that matches `regexp`.
`patternName` is used to describe the regular expression in a user-readable manner.
For example:

```ts
const validator = new TMatch("email", /^\S+@\S+$/);

validator.isValid("foo@bar.com"); // true
validator.isValid("foobar.com"); // false
validator.name === "string(email)"; // true
```

### `TOr(...validators: Validator[])`

Similar in concept as the `|` operator in TypeScript.

Accepts a value when it was accepted by at least one of the `validators`.

### `TAnd(validatorA: Validator, validatorB: Validator)`

Similar in concept as the `&` operator in TypeScript.

Accepts a value when it was accepted by both `validatorA` and `validatorB`.

### `TNot(validator: Validator)`

Accepts a value when it was **not** accepted by the given validator.

## Custom Validators

You can define any custom [validator](#validators) or [compound validator](#compound-validators) until
call signatures are matching.

### Examples

Defining an email validator:

```ts
import { Validator } from "tguard";

class TEmail extends Validator<string> {
  readonly name = "email";

  isValid(value: any): value is string {
    return typeof value === string && value.includes("@");
  }
}
```

Implementation of the built-in `TArray` [compound validator](#compound-validators):

```ts
import {
  Validator,
  ValidatorOrConstructor,
  GenericValidator,
  Guard,
} from "tguard";

export function TArray<T>(
  validator: ValidatorOrConstructor<T>
): Validator<Array<T>> {
  const guard = new Guard(validator);
  const name = `${guard.name}[]`;

  function isValid(value: any): value is Array<T> {
    if (!Array.isArray(value)) return false;
    for (const item of value) {
      if (!guard.isValid(item)) return false;
    }
    return true;
  }

  return new GenericValidator(name, isValid);
}
```
