import Guard, { GuardedType } from "../../Guard";
import TValidate from "../TValidate";

/**
 * Validates if at least one type criteria is met.
 *
 * @returns
 * A `Guard` that is similar in concept as the `|` operator in TypeScript.
 * Accepts a value when it was accepted by at least one of the `guards`.
 *
 * `guard.name`: `"<typeA> | <typeB>"`
 *
 * @example
 * ```ts
 * const guard = TOr(TNumber, TString);
 * guard.isValid(1); // true
 * guard.isValid("foo"); // true
 * guard.isValid(true); // false
 * guard.name === "number | string"; // true
 * ```
 */
export default function TOr<A, B, T extends Array<Guard<unknown>>>(
  guardA: Guard<A>,
  guardB: Guard<B>,
  ...others: T
): Guard<A | B | GuardedType<ArrayType<T>>> {
  const guards = [guardA, guardB, ...others];

  return TValidate<A | B | GuardedType<ArrayType<T>>>(
    `(${guards.map(({ name }) => name).join(" | ")})`,
    (value) => {
      {
        for (const guard of guards) {
          if (guard.isValid(value)) return true;
        }
        return false;
      }
    }
  );
}

type ArrayType<C extends Array<unknown>> = C extends Array<infer T>
  ? T
  : unknown;
