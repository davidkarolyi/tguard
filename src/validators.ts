import { Guard } from "./guard";
import { Validator, IGuard, GuardDefinition } from "./types";

export const TString: Validator = (value: any) => typeof value === "string";

export const TNumber: Validator = (value: any) => typeof value === "number";

export const TBoolean: Validator = (value: any) => typeof value === "boolean";

export const TFunction: Validator = (value: any) => typeof value === "function";

export const TObject: Validator = (value: any) => typeof value === "object";

export const TUndefined: Validator = (value: any) =>
  typeof value === "undefined";

export const TBigInt: Validator = (value: any) => typeof value === "bigint";

export const TNull: Validator = (value: any) => value === null;

export const TAny: Validator = () => true;

export const TArray = (validator: Validator) => (value: any) => {
  if (!Array.isArray(value)) return false;
  for (const item of value) {
    if (!validator(item)) return false;
  }
  return true;
};

export const TGuard = (guard: IGuard<any>) => (value: any) =>
  Boolean(guard.accepts(value));

export const TDefinition = (definition: GuardDefinition) =>
  TGuard(new Guard(definition));

export const TObjectOfShape = (shape: {
  keys: Validator;
  values: Validator;
}) => (value: any) => {
  if (!TObject(value) || TNull(value)) return false;

  for (const key in value) {
    if (!shape.keys(key)) return false;
    if (!shape.values(value[key])) return false;
  }
  return true;
};

export const TNot = (validator: Validator) => (value: any) => !validator(value);

export const TOr = (
  validatorA: Validator,
  validatorB: Validator,
  ...others: Validator[]
) => (value: any) => {
  return [validatorA, validatorB, ...others].reduce(
    (result, validator) => Boolean(result || validator(value)),
    false
  );
};

export const TAnd = (
  validatorA: Validator,
  validatorB: Validator,
  ...others: Validator[]
) => (value: any) => {
  return [validatorA, validatorB, ...others].reduce(
    (result, validator) => Boolean(result && validator(value)),
    true
  );
};
