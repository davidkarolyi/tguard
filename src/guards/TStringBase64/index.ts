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
 * `guard.name: "string(base64<?URL>)"`
 *
 * @example
 * ```ts
 * TStringBase64({ urlSafe: true }).isValid("foobar"); // false
 * TStringBase64({ urlSafe: true }).isValid("c29tZXRoaW5n"); // true
 * TStringBase64({ urlSafe: true }).name === "string(base64URL)"; // true
 * ```
 */
export default function TStringBase64(options: { urlSafe: boolean }) {
  return TValidate<string>(
    `string(base64${options.urlSafe ? "URL" : ""})`,
    (value) => typeof value === "string" && isBase64(value, options)
  );
}
