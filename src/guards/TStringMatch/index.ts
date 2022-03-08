import Guard from "../../Guard";
import TValidate from "../TValidate";

/**
 * Validates if a string matches a regexp.
 * 
 * @returns
 * A `Guard` that accepts only strings that matches the given `regexp`.
 *
 * `guard.name`: `"string(<regexpName>)"`
 * 
 * @param patternName - Describes the regular expression in a user-readable manner.
 * @param regexp - The regexp to use for validation of incoming values.
 * 
 * @example
 * ```ts
 * const guard = TStringMatch("email", /^\S+@\S+$/);
 * guard.isValid("foo@bar.com"); // true
 * guard.isValid("foobar.com"); // false
 * guard.name === "string(email)"; // true
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
