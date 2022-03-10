import Guard from "../../Guard";
import { ObjectSchema, SchemaType } from "./types";
import { SchemaGuard } from "./SchemaGuard";

/**
 * It will validate that the given value is matching the object schema.
 *
 * `guard.name: JSON representation of the object`
 *
 * @param schema - Is a tree of guards. (Just a normal JS object, but with `Guard` values)
 *
 * @returns A `Guard`.
 *
 * @example
 * ```ts
 * const TUser = TObject({
 *   id: TInteger,
 *   name: TString,
 *   cart: {
 *     mangos: TInteger,
 *     avocados: TInteger,
 *   },
 * });
 *
 * TUser.isValid({id: 1, name: "John" cart: {apples: 1}}) // false
 * TUser.isValid({id: 1, name: "John" cart: {mangos: 1, avocados: 2}}) // true
 * TUser.name === '{"id": "string(UUID)", "name": "string" cart: {"mangos": "integer", "avocados": "integeer"}}' // true
 * ```
 */
export default function TObject<T extends ObjectSchema>(
  schema: T
): Guard<SchemaType<T>> {
  return new SchemaGuard(schema);
}
