import Guard from "../../Guard";
import TValidate from "../TValidate";

/**
 * Validates equality to a literal value.
 *
 * @param constant - The literal to compare values against.
 * Only can be a `string`, `number`, `boolean` or `bigint`.
 *
 * @returns
 * A `Guard` which checks if the given value is equals to the `constant` literal.
 *
 * `guard.name: "constant(<constant.name>)"`
 *
 * @example
 * ```ts
 *
 * TConstant("foo").isValid("foobar"); // false
 * TConstant("foo").isValid("bar"); // false
 * TConstant("foo").isValid("foo"); // true
 *
 * TConstant("foo").name === 'constant("foo")'; // true
 * TConstant(2).name === 'constant(2)'; // true
 * ```
 */
export default function TConstant<T extends string | number | boolean | BigInt>(
  constant: T
): Guard<T> {
  return TValidate<T>(
    `constant(${typeof constant === "string" ? `"${constant}"` : constant})`,
    (value) => value === constant
  );
}
