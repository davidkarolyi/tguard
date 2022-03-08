import Guard from "../../Guard";
import { ObjectSchema, SchemaType } from "./types";
import { SchemaGuard } from "./SchemaGuard";

/**
 * It will validate that the given values is matching the object schema.
 *
 * @param schema - Is a tree of guards. (Just a normal JS object, but it with `Guard` values)
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
 * ```
 */
export default function TObject<T extends ObjectSchema>(
  schema: T
): Guard<SchemaType<T>> {
  return new SchemaGuard(schema);
}
