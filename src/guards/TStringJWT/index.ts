import TValidate from "../TValidate";
import isJWT from "validator/lib/isJWT";

/**
 * A `Guard` which validates if a string is a valid JSON Web Token.
 *
 * `guard.name: "string(JWT)"`
 *
 * @example
 * ```ts
 * TStringJWT.isValid("1234"); // false
 * TStringJWT.isValid("something.fooo.bar"); // true
 * TStringJWT.name === "string(JSON)"; // true
 * ```
 */
const TStringJWT = TValidate<string>(
  "string(JWT)",
  (value) => typeof value === "string" && isJWT(value)
);

export default TStringJWT;
