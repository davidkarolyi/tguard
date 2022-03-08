import TValidate from "../TValidate";
import isURL from "validator/lib/isURL";

/**
 * A `Guard` which checks if the string is a valid URL.
 *
 * `guard.name`: `"string(URL)"`
 *
 * @example
 * ```ts
 * TStringURL.isValid("foobar"); // false
 * TStringURL.isValid("foobar.com"); // true
 * TStringURL.name === "string(URL)"; // true
 * ```
 */
const TStringURL = TValidate<string>(
  "string(URL)",
  (value) => typeof value === "string" && isURL(value)
);

export default TStringURL;
