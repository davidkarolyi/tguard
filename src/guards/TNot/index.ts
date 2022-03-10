import Guard from "../../Guard";
import TValidate from "../TValidate";

/**
 * Negates a `Guard`.
 *
 * @returns
 * A `Guard` that accepts a value when it was **not** accepted by the given guard.
 *
 * `guard.name: "!<type>"`
 *
 * @param guard - The guard, which will be negated.
 *
 * @example
 * ```ts
 * TNot(TNumber).isValid(1); // false
 * TNot(TNumber).isValid("foo"); // true
 * TNot(TNumber).name === "!number"; // true
 * ```
 */
export default function TNot<T>(guard: Guard<T>): Guard<Exclude<any, T>> {
  const name = `!${guard.name}`;

  return TValidate<Exclude<any, T>>(name, (value) => !guard.isValid(value));
}
