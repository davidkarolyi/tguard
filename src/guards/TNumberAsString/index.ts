import TValidate from "../TValidate";

/**
 * Guard that accepts strings, which represents a valid number.
 *
 * `guard.name`: `"number(as a string)"`
 *
 * @example
 *  ```ts
 * TNumberAsString.isValid("abcd"); // false
 * TNumberAsString.isValid(15.223); // false
 * TNumberAsString.isValid("15.223"); // true
 * ```
 */
const TNumberAsString = TValidate<string>(
  "number(as a string)",
  (value) =>
    typeof value === "string" &&
    value !== "" &&
    value !== "-0" &&
    !isNaN(Number(value))
);

export default TNumberAsString;
