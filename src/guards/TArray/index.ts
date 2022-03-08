import Guard from "../../Guard";
import TValidate from "../TValidate";

/**
 * Validates an array of elements.
 *
 * @returns
 * A `Guard` that checks if the given value is an array of the given type.
 *
 * `guard.name`: `"<type>[](minLength:<minLength>,maxLength:<maxLength>)"`
 *
 * @param guard - The guard, which validates the elements of the array.
 *
 * @param options.minLength - The array must be at least this long.
 * @param options.maxLength - The array can't be longer than this.
 *
 * @example
 * ```ts
 * const guard = TArray(TNumber);
 * guard.isValid([1, 2, 3]); // true
 * guard.isValid([1, 2, "3"]); // false
 * guard.name === "number[]"; // true
 * ```
 */
export default function TArray<T>(
  guard: Guard<T>,
  options?: { minLength?: number; maxLength?: number }
): Guard<Array<T>> {
  const isOptionEmpty =
    options?.minLength === undefined && options?.maxLength === undefined;
  let name = `${guard.name}[]`;
  if (!isOptionEmpty) name += "(";
  if (options?.minLength !== undefined)
    name += `minLength=${options.minLength}`;
  if (options?.minLength !== undefined && options.maxLength !== undefined)
    name += ",";
  if (options?.maxLength !== undefined)
    name += `maxLength=${options.maxLength}`;
  if (!isOptionEmpty) name += ")";

  return TValidate<Array<T>>(name, (value) => {
    if (!Array.isArray(value)) return false;
    if (
      (options?.minLength || 0) > value.length ||
      (options?.maxLength || Infinity) < value.length
    )
      return false;
    for (const item of value) {
      if (!guard.isValid(item)) return false;
    }
    return true;
  });
}
