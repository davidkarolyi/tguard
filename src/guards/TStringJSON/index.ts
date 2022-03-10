import TValidate from "../TValidate";
import isJSON from "validator/lib/isJSON";

/**
 * A `Guard` which validates if a string is a valid JSON.
 *
 * `guard.name: "string(JSON)"`
 *
 * @example
 * ```ts
 * TStringJSON.isValid("1234"); // false
 * TStringJSON.isValid("{\"foo\": 2}"); // true
 * TStringJSON.name === "string(JSON)"; // true
 * ```
 */
const TStringJSON = TValidate<string>(
  "string(JSON)",
  (value) => typeof value === "string" && isJSON(value)
);

export default TStringJSON;
