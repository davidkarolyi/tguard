import isInt from "validator/lib/isInt";
import TValidate from "../TValidate";

/**
 * Guard that accepts strings, which can be parsed as a valid integer.
 *
 * `guard.name: "integer(as a string)"`
 *
 * @example
 *  ```ts
 * TIntegerAsString.isValid("15.223"); // false
 * TIntegerAsString.isValid(15); // false
 * TIntegerAsString.isValid("15"); // true
 * ```
 */
const TIntegerAsString = TValidate<string>(
  "integer(as a string)",
  (value) =>
    typeof value === "string" &&
    isInt(value, { allow_leading_zeroes: false }) &&
    value !== "-0"
);

export default TIntegerAsString;
