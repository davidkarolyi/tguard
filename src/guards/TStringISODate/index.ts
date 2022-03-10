import TValidate from "../TValidate";
import isISO8601 from "validator/lib/isISO8601";

/**
 * A `Guard` which validates if a string is a valid ISO date string.
 *
 * `guard.name: "string(date)"`
 *
 * @example
 * ```ts
 * TStringISODate.isValid("1234"); // false
 * TStringISODate.isValid("2022-03-06T22:01:41.160Z"); // true
 * TStringISODate.name === "string(date)"; // true
 * ```
 */
const TStringISODate = TValidate<string>(
  "string(date)",
  (value) => typeof value === "string" && isISO8601(value)
);

export default TStringISODate;
