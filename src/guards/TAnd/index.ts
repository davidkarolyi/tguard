import Guard, { GuardedType } from "../../Guard";
import TValidate from "../TValidate";

/**
 * Validates if criterias of two (or more) types are all met.
 *
 * `guard.name: "<typeA.name> & <typeB.name>"`
 *
 * @returns
 * A `Guard` that is similar in concept as the `&` operator in TypeScript.
 * Accepts a value when it was accepted by all `guardA` and `guardB`, and others.
 *
 */
export default function TAnd<A, B, T extends Array<Guard<unknown>>>(
  guardA: Guard<A>,
  guardB: Guard<B>,
  ...others: T
): Guard<A & B & UnionToIntersection<GuardedType<ArrayType<T>>>> {
  const guards = [guardA, guardB, ...others];

  return TValidate(
    `(${guards.map(({ name }) => name).join(" & ")})`,
    (value) => {
      for (const guard of guards) {
        if (!guard.isValid(value)) return false;
      }
      return true;
    }
  );
}

type ArrayType<C extends Array<unknown>> = C extends Array<infer T>
  ? T
  : unknown;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;
