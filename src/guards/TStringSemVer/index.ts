import TValidate from "../TValidate";
import isSemVer from "validator/lib/isSemVer";

/**
 * A `Guard` which checks if the string is a Semantic Versioning Specification (SemVer).
 *
 * `guard.name`: `"string(SemVer)"`
 *
 * @example
 * ```ts
 * TStringSemVer.isValid("foobar"); // false
 * TStringSemVer.isValid("1.0.4"); // true
 * TStringSemVer.name === "string(SemVer)"; // true
 * ```
 */
const TStringSemVer = TValidate<string>(
  "string(SemVer)",
  (value) => typeof value === "string" && isSemVer(value)
);

export default TStringSemVer;
