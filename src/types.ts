import { ValidationError } from "./errors";

/**
 * An abstract class, which has an `isValid` method, and a `name` property, which represents the name of the guarded type.
 *
 * ⚠️ Don't use this directly to create custom validators, use `TValidate` instead.
 */
export abstract class Guard<T> {
  abstract readonly name: string;
  abstract isValid(value: any): value is T;
  cast(value: any): T {
    if (this.isValid(value)) return value as T;
    throw new ValidationError(
      `The given value is not a valid ${this.name}`,
      [],
      this.name
    );
  }
}

/**
 * Infers the type, that the given `Validator` guards.
 */
export type GuardedType<C extends Guard<unknown>> = C extends Guard<infer T>
  ? T
  : unknown;

export type Schema<T = any> = ObjectSchema | Guard<T>;

/**
 * Infers the type, that the given `Schema` represents.
 */
export type SchemaType<C extends Schema> = C extends Guard<unknown>
  ? GuardedType<C>
  : C extends {
      [fieldName: string]: Schema;
    }
  ? { [Property in keyof C]: SchemaType<C[Property]> }
  : unknown;

export type ArrayType<C extends Array<unknown>> = C extends Array<infer T>
  ? T
  : unknown;

export type ObjectSchema = {
  [fieldName: string]: ObjectSchema | Guard<any>;
};
