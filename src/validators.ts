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
 * @param name The name of the type this validator will guard.
 * @param isValid Callback function, decides if a given value is valid or not
 * @typeParam T - The type the created validator will guard
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
 * `validator.name`: `"string"`
 */
export const TString = TValidate<string>(
  "string",
  (value) => typeof value === "string"
);

/**
 * Primitive validator that only accepts the JS type `number`.
 *
 * `validator.name`: `"number"`
 */
export const TNumber = TValidate<number>(
  "number",
  (value) => typeof value === "number"
);

/**
 * Primitive validator that only accepts the JS type `boolean`.
 *
 * `validator.name`: `"number"`
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
 * Primitive validator that only accepts the JS type `object`.
 *
 * `validator.name`: `"object"`
 */
export const TObject = TValidate<Object>(
  "object",
  (value) => typeof value === "object"
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
 * Validator that accepts strings, which can be parsed as a valid number.
 *
 * `validator.name`: `"number(as a string)"`
 */
export const TNumberAsString = TValidate<string>(
  "number(as a string)",
  (value) => typeof value === "string" && value !== "" && !isNaN(Number(value))
);

/**
 * @returns
 * A validator that checks if the given value is an array of the given type.
 *
 * `validator.name`: `"<type>[]"`
 * @param validator The validator, which validates the elements of the array.
 * @example
 * ```ts
 * const validator = TArray(TNumber);
 * validator.isValid([1, 2, 3]); // true
 * validator.isValid([1, 2, "3"]); // false
 * validator.name === "number[]"; // true
 * ```
 */
export function TArray<T>(
  validator: ValidatorOrConstructor<T>
): Validator<Array<T>> {
  const guard = new Guard(validator);
  const name = `${guard.name}[]`;

  return TValidate<Array<T>>(name, (value) => {
    if (!Array.isArray(value)) return false;
    for (const item of value) {
      if (!guard.isValid(item)) return false;
    }
    return true;
  });
}

/**
 * @returns
 * A validator that checks if the given value matches the provided object shape.
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
 * @returns
 * A validator that accepts a value when it was **not** accepted by the given validator.
 *
 * `validator.name`: `"!<type>"`
 *
 * @param validator The validator, which will be negated.
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
 * @returns
 * A validator that is similar in concept as the `|` operator in TypeScript.
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
 * @returns
 * A validator that is similar in concept as the `&` operator in TypeScript.
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
 * @returns
 * A validator that accepts only strings that matches the given `regexp`.
 *
 * `validator.name`: `"string(<regexpName>)"`
 * 
 * @param patternName Describes the regular expression in a user-readable manner.
 * @param regexp The regexp to use for validation of incoming values.
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

export function TStringBase64(options: { urlSafe: boolean }) {
  return TValidate<string>(
    `string(base64${options.urlSafe ? "URL" : ""})`,
    (value: any) => typeof value === "string" && isBase64(value, options)
  );
}

export function TStringOfLength(options: { min?: number; max?: number }) {
  let name = "string";
  const isOptionEmpty = options.min === undefined && options.max === undefined;
  if (!isOptionEmpty) name += "(";
  if (options.min !== undefined) name += `min=${options.min}`;
  if (options.min !== undefined && options.max !== undefined) name += ",";
  if (options.max !== undefined) name += `max=${options.max}`;
  if (!isOptionEmpty) name += ")";

  return TValidate<string>(
    name,
    (value: any) => typeof value === "string" && isByteLength(value, options)
  );
}

export const TStringEmail = TValidate<string>(
  "string(email)",
  (value: any) => typeof value === "string" && isEmail(value)
);

export const TStringISODate = TValidate<string>(
  "string(date)",
  (value: any) => typeof value === "string" && isISO8601(value)
);

export const TStringJSON = TValidate<string>(
  "string(JSON)",
  (value: any) => typeof value === "string" && isJSON(value)
);

export const TStringJWT = TValidate<string>(
  "string(JWT)",
  (value: any) => typeof value === "string" && isJWT(value)
);

export const TStringMIMEType = TValidate<string>(
  "string(MIME type)",
  (value: any) => typeof value === "string" && isMimeType(value)
);

export const TStringPhoneNumber = TValidate<string>(
  "string(phone number)",
  (value: any) => typeof value === "string" && isMobilePhone(value)
);

export const TStringSemVer = TValidate<string>(
  "string(SemVer)",
  (value: any) => typeof value === "string" && isSemVer(value)
);

export const TStringURL = TValidate<string>(
  "string(URL)",
  (value: any) => typeof value === "string" && isURL(value)
);

export function TStringUUID(options: { version: UUIDVersion }) {
  const { version } = options;
  return TValidate<string>(
    `string(UUID-${version === "all" ? version : "v" + version})`,
    (value: any) => typeof value === "string" && isUUID(value, version)
  );
}
