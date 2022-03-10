import TValidate from "../TValidate";
import isEmail from "validator/lib/isEmail";

/**
 * A `Guard` which validates if a string is a valid email.
 *
 * `guard.name: "string(email)"`
 *
 * @example
 * ```ts
 * TStringEmail.isValid("1234"); // false
 * TStringEmail.isValid("foo@bar.com"); // true
 * TStringEmail.name === "string(email)"; // true
 * ```
 */
const TStringEmail = TValidate<string>(
  "string(email)",
  (value) => typeof value === "string" && isEmail(value)
);

export default TStringEmail;
