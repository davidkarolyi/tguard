import TValidate from "../TValidate";
import isByteLength from "validator/lib/isByteLength";

/**
 * Validates if a string is in the given length range.
 *
 * @param options.min - Be at list this long.
 * @param options.max - Don't be longer than this.
 *
 * @returns
 * A `Guard` that accepts only strings, which is the given length.
 *
 * `guard.name`: `"string(minLength=<minLength>,maxLength=<maxLength>)"`
 *
 * @example
 * ```ts
 * const guard = TStringOfLength({ minLength: 5 });
 * guard.isValid("1234"); // false
 * guard.isValid("123456789"); // true
 * guard.name === "string(minLength=5)"; // true
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
