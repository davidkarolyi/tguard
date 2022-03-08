import TValidate from "../TValidate";
import isMimeType from "validator/lib/isMimeType";

/**
 * A `Guard` which validates if a string is a valid [MIME type](https://en.wikipedia.org/wiki/Media_type).
 *
 * `guard.name`: `"string(MIME type)"`
 *
 * @example
 * ```ts
 * TStringMIMEType.isValid("foobar"); // false
 * TStringMIMEType.isValid("application/json"); // true
 * TStringMIMEType.name === "string(MIME type)"; // true
 * ```
 */
const TStringMIMEType = TValidate<string>(
  "string(MIME type)",
  (value) => typeof value === "string" && isMimeType(value)
);

export default TStringMIMEType;
