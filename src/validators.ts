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

export function TValidate<T = never>(
  name: string,
  isValid: (value: any) => boolean
): Validator<T> {
  return new GenericValidator(name, (value: any): value is T => isValid(value));
}

// primitives
export const TString = TValidate<string>(
  "string",
  (value) => typeof value === "string"
);
export const TNumber = TValidate<number>(
  "number",
  (value) => typeof value === "number"
);
export const TBoolean = TValidate<boolean>(
  "boolean",
  (value) => typeof value === "boolean"
);
export const TFunction = TValidate<Function>(
  "function",
  (value) => typeof value === "function"
);
export const TObject = TValidate<Object>(
  "object",
  (value) => typeof value === "object"
);
export const TUndefined = TValidate<undefined>(
  "undefined",
  (value) => typeof value === "undefined"
);
export const TBigInt = TValidate<BigInt>(
  "bigint",
  (value) => typeof value === "bigint"
);

export const TNull = TValidate<null>("null", (value) => value === null);

export const TAny = TValidate<any>("any", () => true);

export const TNumberAsString = TValidate<string>(
  "number(as a string)",
  (value) => typeof value === "string" && value !== "" && !isNaN(Number(value))
);

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

export function TNot<T>(
  validator: ValidatorOrConstructor<T>
): Validator<Exclude<any, T>> {
  const guard = new Guard(validator);
  const name = `!${guard.name}`;

  return TValidate<Exclude<any, T>>(name, (value) => !guard.isValid(value));
}

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

export function TStringMatch(
  patternName: string,
  regexp: RegExp
): Validator<string> {
  return TValidate<string>(`string(${patternName})`, (value) =>
    regexp.test(value)
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
