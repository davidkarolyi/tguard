import Guard from "../../Guard";
import TValidate from "../TValidate";

/**
 * Validates the shape of an object.
 *
 * @returns
 * A `Guard` that checks if the given value matches the provided object shape.
 *
 * Accpets not-null objects, where all `keys`
 * and `values` are accepted by the given shape `guards`.
 * Similar in concept as TypeScript's `{[keys: string]: number}` type annotations.
 *
 * `guard.name: "{ [<keyType>]: <valueType> }"`
 *
 * @param shape
 * The guards, which will validate the keys and values of the given object.
 *
 * @example
 *  ```ts
 * const guard = TObjectShape({
 *   keys: TString,
 *   values: TNumber,
 * });
 *
 * guard.isValid({
 *   avocado: 2,
 *   orange: 5,
 * }); // true
 *
 * guard.isValid({
 *   avocado: "green",
 *   orange: 5,
 * }); // false
 *
 * guard.name === "{ [string]: number }"; // true
 * ```
 */
export default function TObjectOfShape<T>(shape: {
  keys: Guard<string>;
  values: Guard<T>;
}): Guard<Record<string, T>> {
  const name = `{ [${shape.keys.name}]: ${shape.values.name} }`;

  return TValidate<Record<string, T>>(name, (value) => {
    {
      if (typeof value !== "object" || value === null) return false;
      for (const key in value) {
        if (!shape.keys.isValid(key)) return false;
        if (!shape.values.isValid(value[key])) return false;
      }
      return true;
    }
  });
}
