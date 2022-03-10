import TValidate from "../TValidate";
import isMobilePhone from "validator/lib/isMobilePhone";

/**
 * A `Guard` which validates if a string is a valid phone number.
 * (all locale formats are accepted)
 *
 * `guard.name: "string(phone number)"`
 *
 * @example
 * ```ts
 * TStringPhoneNumber.isValid("foobar"); // false
 * TStringPhoneNumber.isValid("061555555"); // true
 * TStringPhoneNumber.name === "string(phone number)"; // true
 * ```
 */
const TStringPhoneNumber = TValidate<string>(
  "string(phone number)",
  (value) => typeof value === "string" && isMobilePhone(value)
);

export default TStringPhoneNumber;
