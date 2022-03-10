import TValidate from "../TValidate";

/**
 * Guard that accepts whole numbers.
 *
 * `guard.name: "integer"`
 *
 * @example
 *  ```ts
 * TInteger.isValid("15"); // false
 * TInteger.isValid(15.223); // false
 * TInteger.isValid(15); // true
 * ```
 */
const TInteger = TValidate<number>(
  "integer",
  (value) => typeof value === "number" && Number.isInteger(value)
);

export default TInteger;
