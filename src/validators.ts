import { Guard } from "./guard";
import {
  Constructor,
  ArrayType,
  ValidatorType,
  Validator,
  ValidatorOrConstructor,
} from "./types";

abstract class PrimitiveTypeValidator<T> extends Validator<T> {
  isValid(value: any): value is T {
    return typeof value === this.name;
  }
}

export class GenericValidator<T> extends Validator<T> {
  readonly name: string;
  isValid: (value: any) => value is T;

  constructor(name: string, isValid: (value: any) => value is T) {
    super();
    this.name = name;
    this.isValid = isValid.bind(this);
  }
}

export class TString extends PrimitiveTypeValidator<string> {
  readonly name = "string";
}

export class TNumber extends PrimitiveTypeValidator<number> {
  readonly name = "number";
}

export class TBoolean extends PrimitiveTypeValidator<boolean> {
  readonly name = "boolean";
}

export class TFunction extends PrimitiveTypeValidator<Function> {
  readonly name = "function";
}

export class TObject extends PrimitiveTypeValidator<Object> {
  readonly name = "object";
}

export class TUndefined extends PrimitiveTypeValidator<undefined> {
  readonly name = "undefined";
}

export class TBigInt extends PrimitiveTypeValidator<BigInt> {
  readonly name = "bigint";
}

export class TNull extends Validator<null> {
  readonly name = "null";

  isValid(value: any): value is null {
    return value === null;
  }
}

export class TAny extends Validator<any> {
  readonly name = "any";

  isValid(value: any): value is any {
    return true;
  }
}

export function TArray<T>(
  itemValidator: ValidatorOrConstructor<T>
): Validator<Array<T>> {
  const guard = new Guard(itemValidator);
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

export function TObjectOfShape<T>(shape: {
  keys: ValidatorOrConstructor<string>;
  values: ValidatorOrConstructor<T>;
}): Validator<Record<string, T>> {
  const keyGuard = new Guard(shape.keys);
  const valueGuard = new Guard(shape.values);
  const name = `{ [${keyGuard.name}]: ${valueGuard.name} }`;

  function isValid(value: any): value is Record<string, T> {
    if (typeof value !== "object" || value === null) return false;
    for (const key in value) {
      if (!keyGuard.isValid(key)) return false;
      if (!valueGuard.isValid(value[key])) return false;
    }
    return true;
  }

  return new GenericValidator(name, isValid);
}

export function TNot<T>(
  validator: ValidatorOrConstructor<T>
): Validator<Exclude<any, T>> {
  const guard = new Guard(validator);
  const name = `!${guard.name}`;

  function isValid(value: any): value is Exclude<any, T> {
    return !guard.isValid(value);
  }

  return new GenericValidator(name, isValid);
}

export function TOr<A, B, T extends Array<Constructor<Validator<unknown>>>>(
  validatorA: Constructor<Validator<A>>,
  validatorB: Constructor<Validator<B>>,
  ...others: T
): Validator<A | B | ValidatorType<InstanceType<ArrayType<T>>>> {
  const validators = [validatorA, validatorB, ...others].map(
    (Validator) => new Validator()
  );

  const name = `(${validators.map(({ name }) => name).join(" | ")})`;

  function isValid(
    value: any
  ): value is A | B | ValidatorType<InstanceType<ArrayType<T>>> {
    for (const validator of validators) {
      if (validator.isValid(value)) return true;
    }
    return false;
  }

  return new GenericValidator(name, isValid);
}
