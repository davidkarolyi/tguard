import Guard from "../../Guard";
import TValidate from "../TValidate";

/**
 * Validates if a string matches a regexp.
 * 
 * @returns
 * A `Guard` that accepts only strings that matches the given `regexp`.
 *
 * `guard.name: "string(<regexpName>)"`
 * 
 * @param patternName - Describes the regular expression in a user-readable form.
 * @param regexp - The regexp to use for validation of incoming values.
 * 
 * @example
 * ```ts
 * const TStringUpperCase = TStringMatch("string(upper-case)",/^[A-Z]/);
 * TStringUpperCase.isValid("Foo"); // true
 * TStringUpperCase.isValid("foo"); // false
 * TStringUpperCase.name === "string(upper-case)"; // true
```
 */
export default function TStringMatch(
  patternName: string,
  regexp: RegExp
): Guard<string> {
  return TValidate<string>(
    `string(${patternName})`,
    (value) => typeof value === "string" && regexp.test(value)
  );
}
