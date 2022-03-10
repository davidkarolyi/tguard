import Guard from "../../Guard";
import TValidate from "../TValidate";

/**
 * Validates if criterias of two types are both met.
 *
 * `guard.name: "<typeA.name> & <typeB.name>"`
 *
 * @returns
 * A `Guard` that is similar in concept as the `&` operator in TypeScript.
 * Accepts a value when it was accepted by both `guardA` and `guardB`.
 *
 */
export default function TAnd<A, B>(
  guardA: Guard<A>,
  guardB: Guard<B>
): Guard<A & B> {
  const guards = [guardA, guardB];

  return TValidate<A & B>(
    `(${guards.map(({ name }) => name).join(" & ")})`,
    (value) => {
      for (const guard of guards) {
        if (!guard.isValid(value)) return false;
      }
      return true;
    }
  );
}
