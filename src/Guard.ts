import { InvalidValueError } from "./errors";

/**
 * An abstract class, which has an `isValid` method, and a `name` property, which represents the name of the guarded type.
 *
 * ⚠️ Don't use this directly to create custom guards, use `TValidate` instead.
 */
export default abstract class Guard<T> {
  abstract readonly name: string;
  abstract isValid(value: any): value is T;
  cast(value: any): T {
    if (this.isValid(value)) return value as T;
    throw new InvalidValueError([], this.name);
  }
}

/**
 * Infers the type, that the given `Guard` guards.
 */
export type GuardedType<C extends Guard<unknown>> = C extends Guard<infer T>
  ? T
  : unknown;
