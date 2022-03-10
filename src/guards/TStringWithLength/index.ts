import TValidate from "../TValidate";
import isByteLength from "validator/lib/isByteLength";

/**
 * Validates if a string is in the given length range.
 *
 * @param options.min - Be at least this long.
 * @param options.max - Don't be longer than this.
 *
 * @returns
 * A `Guard` that accepts only strings, that is in the given length range.
 *
 * `guard.name: "string(minLength=<minLength>,maxLength=<maxLength>)"`
 *
 * @example
 * ```ts
 * TStringOfLength({ minLength: 5 }).isValid("1234"); // false
 * TStringOfLength({ minLength: 5 }).isValid("123456789"); // true
 * TStringOfLength({ minLength: 5 }).name === "string(minLength=5)"; // true
 * ```
 */
export default function TStringWithLength(options: {
  minLength?: number;
  maxLength?: number;
}) {
  let name = "string";
  const isOptionEmpty =
    options.minLength === undefined && options.maxLength === undefined;
  if (!isOptionEmpty) name += "(";
  if (options.minLength !== undefined) name += `minLength=${options.minLength}`;
  if (options.minLength !== undefined && options.maxLength !== undefined)
    name += ",";
  if (options.maxLength !== undefined) name += `maxLength=${options.maxLength}`;
  if (!isOptionEmpty) name += ")";

  return TValidate<string>(
    name,
    (value) =>
      typeof value === "string" &&
      isByteLength(value, { min: options.minLength, max: options.maxLength })
  );
}
