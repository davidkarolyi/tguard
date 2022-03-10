import { InvalidValueError } from "./errors";

/**
 * An abstract class, which is the parent class of all Guards. (Names starting with a `T`)
 *
 * ⚠️ Don't use this directly to create custom guards, use `TValidate` instead.
 *
 * @typeParam T - Guarded type
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
