import { Guard } from "./guard";
import {
  ArrayType,
  ValidatorType,
  Validator,
  ValidatorOrConstructor,
} from "./types";
import isBase64 from "validator/lib/isBase64";
import isByteLength from "validator/lib/isByteLength";
import isEmail from "validator/lib/isEmail";
import isISO8601 from "validator/lib/isISO8601";
import isJSON from "validator/lib/isJSON";
import isJWT from "validator/lib/isJWT";
import isMimeType from "validator/lib/isMimeType";
import isMobilePhone from "validator/lib/isMobilePhone";
import isSemVer from "validator/lib/isSemVer";
import isURL from "validator/lib/isURL";
import isUUID, { UUIDVersion } from "validator/lib/isUUID";
import isInt from "validator/lib/isInt";

class GenericValidator<T> extends Validator<T> {
  readonly name: string;
  isValid: (value: any) => value is T;

  constructor(name: string, isValid: (value: any) => value is T) {
    super();
    this.name = name;
    this.isValid = isValid.bind(this);
  }
}

/**
 * Creates a custom `Validator` from the given params.
 *
 * @param name - The name of the type this validator will guard.
 * @param isValid - Callback function, decides if a given value is valid or not
 *
 * @typeParam T - The type the created validator will guard.
 *
 * > ⚠️ Don't forget to provide `T` type parameter!
 *
 * @example
 * Defining a validator that validates if a number is bigger than 10:
 * ```ts
 * const TBiggerThan10 = TValidate<number>(
 *   "number(bigger than 10)",
 *   (value) => typeof value === "number" && value > 10
 * );
 * ```
 */
export function TValidate<T = never>(
  name: string,
  isValid: (value: any) => boolean
): Validator<T> {
  return new GenericValidator(name, (value: any): value is T => isValid(value));
}

/**
 * Primitive validator that only accepts the JS type `string`.
 *
 * `validator.name`: `string`
 */
export const TString = TValidate<string>(
  "string",
  (value) => typeof value === "string"
);

/**
 * Primitive validator that only accepts numbers.
 * Not accepts NaN.
 *
 * `validator.name`: `"number"`
 */
export const TNumber = TValidate<number>(
  "number",
  (value) => typeof value === "number" && !isNaN(value)
);

/**
 * Primitive validator that only accepts the JS type `boolean`.
 *
 * `validator.name`: `"boolean"`
 */
export const TBoolean = TValidate<boolean>(
  "boolean",
  (value) => typeof value === "boolean"
);

/**
 * Primitive validator that only accepts the JS type `function`.
 *
 * `validator.name`: `"function"`
 */
export const TFunction = TValidate<Function>(
  "function",
  (value) => typeof value === "function"
);

/**
 * Primitive validator that only accepts objects.
 * Does not accept null.
 *
 * `validator.name`: `"object"`
 */
export const TObject = TValidate<Object>(
  "object",
  (value) => typeof value === "object" && value !== null
);

/**
 * Primitive validator that only accepts the JS type `undefined`.
 *
 * `validator.name`: `"undefined"`
 */
export const TUndefined = TValidate<undefined>(
  "undefined",
  (value) => typeof value === "undefined"
);

/**
 * Primitive validator that only accepts the JS type `bigint`.
 *
 * `validator.name`: `"bigint"`
 */
export const TBigInt = TValidate<BigInt>(
  "bigint",
  (value) => typeof value === "bigint"
);

/**
 * Validator that only accepts `null`.
 *
 * `validator.name`: `"null"`
 */
export const TNull = TValidate<null>("null", (value) => value === null);

/**
 * Validator that accepts any value.
 *
 * `validator.name`: `"any"`
 */
export const TAny = TValidate<any>("any", () => true);

/**
 * Validator that accepts whole numbers.
 *
 * `validator.name`: `"integer"`
 *
 * @example
 *  ```ts
 * TInteger.isValid("15"); // false
 * TInteger.isValid(15.223); // false
 * TInteger.isValid(15); // true
 * ```
 */
export const TInteger = TValidate<number>(
  "integer",
  (value) => typeof value === "number" && Number.isInteger(value)
);

/**
 * Validator that accepts strings, which represents a valid number.
 *
 * `validator.name`: `"number(as a string)"`
 *
 * @example
 *  ```ts
 * TNumberAsString.isValid("abcd"); // false
 * TNumberAsString.isValid(15.223); // false
 * TNumberAsString.isValid("15.223"); // true
 * ```
 */
export const TNumberAsString = TValidate<string>(
  "number(as a string)",
  (value) =>
    typeof value === "string" &&
    value !== "" &&
    value !== "-0" &&
    !isNaN(Number(value))
);

/**
 * Validator that accepts strings, which can be parsed as a valid integer.
 *
 * `validator.name`: `"integer(as a string)"`
 *
 * @example
 *  ```ts
 * TIntegerAsString.isValid("15.223"); // false
 * TIntegerAsString.isValid(15); // false
 * TIntegerAsString.isValid("15"); // true
 * ```
 */
export const TIntegerAsString = TValidate<string>(
  "integer(as a string)",
  (value) =>
    typeof value === "string" &&
    isInt(value, { allow_leading_zeroes: false }) &&
    value !== "-0"
);

/**
 * Validates an array of elements.
 *
 * @returns
 * A `Validator` that checks if the given value is an array of the given type.
 *
 * `validator.name`: `"<type>[](minLength:<minLength>,maxLength:<maxLength>)"`
 *
 * @param validator - The validator, which validates the elements of the array.
 *
 * @param options.minLength - The array must be at least this long.
 * @param options.maxLength - The array can't be longer than this.
 *
 * @example
 * ```ts
 * const validator = TArray(TNumber);
 * validator.isValid([1, 2, 3]); // true
 * validator.isValid([1, 2, "3"]); // false
 * validator.name === "number[]"; // true
 * ```
 */
export function TArray<T>(
  validator: ValidatorOrConstructor<T>,
  options?: { minLength?: number; maxLength?: number }
): Validator<Array<T>> {
  const guard = new Guard(validator);

  const isOptionEmpty =
    options?.minLength === undefined && options?.maxLength === undefined;
  let name = `${guard.name}[]`;
  if (!isOptionEmpty) name += "(";
  if (options?.minLength !== undefined)
    name += `minLength=${options.minLength}`;
  if (options?.minLength !== undefined && options.maxLength !== undefined)
    name += ",";
  if (options?.maxLength !== undefined)
    name += `maxLength=${options.maxLength}`;
  if (!isOptionEmpty) name += ")";

  return TValidate<Array<T>>(name, (value) => {
    if (!Array.isArray(value)) return false;
    if (
      (options?.minLength || 0) > value.length ||
      (options?.maxLength || Infinity) < value.length
    )
      return false;
    for (const item of value) {
      if (!guard.isValid(item)) return false;
    }
    return true;
  });
}

/**
 * Validates the shape of an object.
 *
 * @returns
 * A `Validator` that checks if the given value matches the provided object shape.
 *
 * Accpets not-null objects, where all `keys`
 * and `values` are accepted by the given shape `validators`.
 * Similar in concept as TypeScript's `{[keys: string]: number}` type annotations.
 *
 * `validator.name`: `"{ [<keyType>]: <valueType> }"`
 *
 * @param shape
 * The validators, which will validate the keys and values of the given object.
 *
 * @example
 *  ```ts
 * const validator = TObjectShape({
 *   keys: TString,
 *   values: TNumber,
 * });
 *
 * validator.isValid({
 *   avocado: 2,
 *   orange: 5,
 * }); // true
 *
 * validator.isValid({
 *   avocado: "green",
 *   orange: 5,
 * }); // false
 *
 * validator.name === "{ [string]: number }"; // true
 * ```
 */
export function TObjectOfShape<T>(shape: {
  keys: ValidatorOrConstructor<string>;
  values: ValidatorOrConstructor<T>;
}): Validator<Record<string, T>> {
  const keyGuard = new Guard(shape.keys);
  const valueGuard = new Guard(shape.values);
  const name = `{ [${keyGuard.name}]: ${valueGuard.name} }`;

  return TValidate<Record<string, T>>(name, (value) => {
    {
      if (typeof value !== "object" || value === null) return false;
      for (const key in value) {
        if (!keyGuard.isValid(key)) return false;
        if (!valueGuard.isValid(value[key])) return false;
      }
      return true;
    }
  });
}

/**
 * Negates a type criteria.
 *
 * @returns
 * A `Validator` that accepts a value when it was **not** accepted by the given validator.
 *
 * `validator.name`: `"!<type>"`
 *
 * @param validator - The validator, which will be negated.
 *
 * @example
 * ```ts
 * const validator = TNot(TNumber);
 * validator.isValid(1); // false
 * validator.isValid("foo"); // true
 * validator.name === "!number"; // true
 * ```
 */
export function TNot<T>(
  validator: ValidatorOrConstructor<T>
): Validator<Exclude<any, T>> {
  const guard = new Guard(validator);
  const name = `!${guard.name}`;

  return TValidate<Exclude<any, T>>(name, (value) => !guard.isValid(value));
}

/**
 * Validates if at least one type criteria is met.
 *
 * @returns
 * A `Validator` that is similar in concept as the `|` operator in TypeScript.
 * Accepts a value when it was accepted by at least one of the `validators`.
 *
 * `validator.name`: `"<typeA> | <typeB>"`
 *
 * @example
 * ```ts
 * const validator = TOr(TNumber, TString);
 * validator.isValid(1); // true
 * validator.isValid("foo"); // true
 * validator.isValid(true); // false
 * validator.name === "number | string"; // true
 * ```
 */
export function TOr<A, B, T extends Array<ValidatorOrConstructor<unknown>>>(
  validatorA: ValidatorOrConstructor<A>,
  validatorB: ValidatorOrConstructor<B>,
  ...others: T
): Validator<A | B | ValidatorType<ArrayType<T>>> {
  const validators = [validatorA, validatorB, ...others].map(
    (validator) => new Guard(validator)
  );

  return TValidate<A | B | ValidatorType<ArrayType<T>>>(
    `(${validators.map(({ name }) => name).join(" | ")})`,
    (value) => {
      {
        for (const validator of validators) {
          if (validator.isValid(value)) return true;
        }
        return false;
      }
    }
  );
}

/**
 * Validates if criterias of two types are both met.
 *
 * @returns
 * A `Validator` that is similar in concept as the `&` operator in TypeScript.
 * Accepts a value when it was accepted by both `validatorA` and `validatorB`.
 *
 * `validator.name`: `"<typeA> & <typeB>"`
 */
export function TAnd<A, B>(
  validatorA: ValidatorOrConstructor<A>,
  validatorB: ValidatorOrConstructor<B>
): Validator<A & B> {
  const validators = [validatorA, validatorB].map(
    (validator) => new Guard(validator)
  );

  return TValidate<A & B>(
    `(${validators.map(({ name }) => name).join(" & ")})`,
    (value) => {
      for (const validator of validators) {
        if (!validator.isValid(value)) return false;
      }
      return true;
    }
  );
}

/**
 * Validates if a string matches a regexp.
 * 
 * @returns
 * A `Validator` that accepts only strings that matches the given `regexp`.
 *
 * `validator.name`: `"string(<regexpName>)"`
 * 
 * @param patternName - Describes the regular expression in a user-readable manner.
 * @param regexp - The regexp to use for validation of incoming values.
 * 
 * @example
 * ```ts
 * const validator = TStringMatch("email", /^\S+@\S+$/);
 * validator.isValid("foo@bar.com"); // true
 * validator.isValid("foobar.com"); // false
 * validator.name === "string(email)"; // true
```
 */
export function TStringMatch(
  patternName: string,
  regexp: RegExp
): Validator<string> {
  return TValidate<string>(
    `string(${patternName})`,
    (value) => typeof value === "string" && regexp.test(value)
  );
}

/**
 * Validates if a string is a base64 encoded data.
 *
 * @param options.urlSafe - If set to true, it will check if the string is bas64URL encoded
 *
 * @returns
 * A `Validator` that accepts only strings that are base64 encoded.
 *
 * `validator.name`: `"string(base64<?URL>)"`
 *
 * @example
 * ```ts
 * const validator = TStringBase64({ urlSafe: true });
 * validator.isValid("foobar"); // false
 * validator.isValid("c29tZXRoaW5n"); // true
 * validator.name === "string(base64URL)"; // true
 * ```
 */
export function TStringBase64(options: { urlSafe: boolean }) {
  return TValidate<string>(
    `string(base64${options.urlSafe ? "URL" : ""})`,
    (value) => typeof value === "string" && isBase64(value, options)
  );
}

/**
 * Validates if a string is in the given length range.
 *
 * @param options.min - Be at list this long.
 * @param options.max - Don't be longer than this.
 *
 * @returns
 * A `Validator` that accepts only strings, which is the given length.
 *
 * `validator.name`: `"string(minLength=<minLength>,maxLength=<maxLength>)"`
 *
 * @example
 * ```ts
 * const validator = TStringOfLength({ minLength: 5 });
 * validator.isValid("1234"); // false
 * validator.isValid("123456789"); // true
 * validator.name === "string(minLength=5)"; // true
 * ```
 */
export function TStringOfLength(options: {
  minLength?: number;
  maxLength?: number;
}) {
  let name = "string";
  const isOptionEmpty =
    options.minLength === undefined && options.maxLength === undefined;
  if (!isOptionEmpty) name += "(";
  if (options.minLength !== undefined) name += `minLength=${options.minLength}`;
  if (options.minLength !== undefined && options.maxLength !== undefined)
    name += ",";
  if (options.maxLength !== undefined) name += `maxLength=${options.maxLength}`;
  if (!isOptionEmpty) name += ")";

  return TValidate<string>(
    name,
    (value) =>
      typeof value === "string" &&
      isByteLength(value, { min: options.minLength, max: options.maxLength })
  );
}

/**
 * A `Validator` which validates if a string is a valid email.
 *
 * `validator.name`: `"string(email)"`
 *
 * @example
 * ```ts
 * TStringEmail.isValid("1234"); // false
 * TStringEmail.isValid("foo@bar.com"); // true
 * TStringEmail.name === "string(email)"; // true
 * ```
 */
export const TStringEmail = TValidate<string>(
  "string(email)",
  (value) => typeof value === "string" && isEmail(value)
);

/**
 * A `Validator` which validates if a string is a valid ISO date string.
 *
 * `validator.name`: `"string(date)"`
 *
 * @example
 * ```ts
 * TStringISODate.isValid("1234"); // false
 * TStringISODate.isValid("2022-03-06T22:01:41.160Z"); // true
 * TStringISODate.name === "string(date)"; // true
 * ```
 */
export const TStringISODate = TValidate<string>(
  "string(date)",
  (value) => typeof value === "string" && isISO8601(value)
);

/**
 * A `Validator` which validates if a string is a valid JSON.
 *
 * `validator.name`: `"string(JSON)"`
 *
 * @example
 * ```ts
 * TStringJSON.isValid("1234"); // false
 * TStringJSON.isValid("{\"foo\": 2}"); // true
 * TStringJSON.name === "string(JSON)"; // true
 * ```
 */
export const TStringJSON = TValidate<string>(
  "string(JSON)",
  (value) => typeof value === "string" && isJSON(value)
);

/**
 * A `Validator` which validates if a string is a valid JSON Web Token.
 *
 * `validator.name`: `"string(JWT)"`
 *
 * @example
 * ```ts
 * TStringJWT.isValid("1234"); // false
 * TStringJWT.isValid("something.fooo.bar"); // true
 * TStringJWT.name === "string(JSON)"; // true
 * ```
 */
export const TStringJWT = TValidate<string>(
  "string(JWT)",
  (value) => typeof value === "string" && isJWT(value)
);

/**
 * A `Validator` which validates if a string is a valid [MIME type](https://en.wikipedia.org/wiki/Media_type).
 *
 * `validator.name`: `"string(MIME type)"`
 *
 * @example
 * ```ts
 * TStringMIMEType.isValid("foobar"); // false
 * TStringMIMEType.isValid("application/json"); // true
 * TStringMIMEType.name === "string(MIME type)"; // true
 * ```
 */
export const TStringMIMEType = TValidate<string>(
  "string(MIME type)",
  (value) => typeof value === "string" && isMimeType(value)
);

/**
 * A `Validator` which validates if a string is a valid phone number.
 * (all locale formats are accepted)
 *
 * `validator.name`: `"string(phone number)"`
 *
 * @example
 * ```ts
 * TStringPhoneNumber.isValid("foobar"); // false
 * TStringPhoneNumber.isValid("061555555"); // true
 * TStringPhoneNumber.name === "string(phone number)"; // true
 * ```
 */
export const TStringPhoneNumber = TValidate<string>(
  "string(phone number)",
  (value) => typeof value === "string" && isMobilePhone(value)
);

/**
 * A `Validator` which checks if the string is a Semantic Versioning Specification (SemVer).
 *
 * `validator.name`: `"string(SemVer)"`
 *
 * @example
 * ```ts
 * TStringSemVer.isValid("foobar"); // false
 * TStringSemVer.isValid("1.0.4"); // true
 * TStringSemVer.name === "string(SemVer)"; // true
 * ```
 */
export const TStringSemVer = TValidate<string>(
  "string(SemVer)",
  (value) => typeof value === "string" && isSemVer(value)
);

/**
 * A `Validator` which checks if the string is a valid URL.
 *
 * `validator.name`: `"string(URL)"`
 *
 * @example
 * ```ts
 * TStringURL.isValid("foobar"); // false
 * TStringURL.isValid("foobar.com"); // true
 * TStringURL.name === "string(URL)"; // true
 * ```
 */
export const TStringURL = TValidate<string>(
  "string(URL)",
  (value) => typeof value === "string" && isURL(value)
);

/**
 * Checks if the string is a valid UUID.
 *
 * @param options.version - The uuid version (3 | 4 | 5 | "3" | "4" | "5" | "all")
 *
 * @returns
 * A `Validator` which checks if the string is a valid UUID of the given `version`.
 *
 * `validator.name`: `"string(UUID-v<version>)"`
 *
 * @example
 * ```ts
 * const validator = TStringUUID({ version: 4 })
 * TStringURL.isValid("foobar"); // false
 * TStringURL.isValid("936a0dd4-cf7f-497d-a0cd-7c891416c719"); // true
 * TStringURL.name === "string(UUID-v4)"; // true
 * ```
 */
export function TStringUUID(options: { version: UUIDVersion }) {
  const { version } = options;
  return TValidate<string>(
    `string(UUID-${version === "all" ? version : "v" + version})`,
    (value) => typeof value === "string" && isUUID(value, version)
  );
}

/**
 * Validates equality to a literal value.
 *
 * @param constant - The literal to compare values against.
 * Only can be a string, number, boolean or bigint.
 *
 * @returns
 * A `Validator` which checks if the given value is equals to the `constant` literal.
 *
 * `validator.name`: `"constant(<constant>)"`
 *
 * @example
 * ```ts
 * const validator = TConstant("foo")
 *
 * validator.isValid("foobar"); // false
 * validator.isValid("bar"); // false
 * validator.isValid("foo"); // true
 *
 * validator.name === 'constant("foo")'; // true
 * TConstant(2).name === 'constant(2)'; // true
 * ```
 */
export function TConstant<T extends string | number | boolean | BigInt>(
  constant: T
): Validator<T> {
  return TValidate<T>(
    `constant(${typeof constant === "string" ? `"${constant}"` : constant})`,
    (value) => value === constant
  );
}
