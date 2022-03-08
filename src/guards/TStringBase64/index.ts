import isBase64 from "validator/lib/isBase64";
import TValidate from "../TValidate";

/**
 * Validates if a string is a base64 encoded data.
 *
 * @param options.urlSafe - If set to true, it will check if the string is bas64URL encoded
 *
 * @returns
 * A `Guard` that accepts only strings that are base64 encoded.
 *
 * `guard.name`: `"string(base64<?URL>)"`
 *
 * @example
 * ```ts
 * const guard = TStringBase64({ urlSafe: true });
 * guard.isValid("foobar"); // false
 * guard.isValid("c29tZXRoaW5n"); // true
 * guard.name === "string(base64URL)"; // true
 * ```
 */
export default function TStringBase64(options: { urlSafe: boolean }) {
  return TValidate<string>(
    `string(base64${options.urlSafe ? "URL" : ""})`,
    (value) => typeof value === "string" && isBase64(value, options)
  );
}
