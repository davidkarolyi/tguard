import { TreeDefinition } from "./tree";

/**
 * An abstract class, which has an `isValid` method, and a `name` property, which represents the name of the guarded type.
 *
 * ⚠️ Don't use this directly to create custom validators, use `TValidate` instead.
 */
export abstract class Validator<T> {
  abstract readonly name: string;
  abstract isValid(value: any): value is T;
}

export type ValidatorOrConstructor<T = unknown> =
  | Validator<T>
  | Constructor<Validator<T>>;

export type ValidatorType<C extends ValidatorOrConstructor<unknown>> =
  C extends Validator<infer T>
    ? T
    : C extends Constructor<Validator<infer T>>
    ? T
    : unknown;

export type Schema<T = any> = TreeDefinition<ValidatorOrConstructor<T>>;

export type SchemaType<C extends Schema> = C extends Constructor<
  Validator<unknown>
>
  ? ValidatorType<InstanceType<C>>
  : C extends Validator<unknown>
  ? ValidatorType<C>
  : C extends {
      [fieldName: string]: Schema;
    }
  ? { [Property in keyof C]: SchemaType<C[Property]> }
  : unknown;

export type ArrayType<C extends Array<unknown>> = C extends Array<infer T>
  ? T
  : unknown;

export type Constructor<T> = new () => T;
