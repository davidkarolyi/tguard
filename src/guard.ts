import has from "lodash/has";
import get from "lodash/get";
import { Tree } from "./tree";
import {
  Constructor,
  SchemaType,
  ValidatorType,
  Schema,
  Validator,
  ValidatorOrConstructor,
} from "./types";
import { MissingValueError, InvalidValueError } from "./errors";

export type GuardedType<G extends Guard<Schema>> = ValidatorType<G>;

/**
 * Guards a type defined by the given schema.
 *
 * @example
 * ```ts
 * const TPost = new Guard({
 *   id: TStringUUID({version: 4});
 *   title: TString,
 *   body: TString,
 * });
 *
 * const TUser = new Guard({
 *   id: TStringUUID({version: 4});
 *   name: TString,
 *   posts: TArray(TPost),
 * });
 *
 * // Note: If you don't want to define these types twice
 * // (once as a TypeScript type, once as a guard):
 * type User = GuardedType<typeof TUser>;
 * type Post = GuardedType<typeof TPost>;
 *
 * // We have an unknown value, that we fetched from an external API,
 * // TypeScript will implicitly infer it as "any" type:
 * const john: any = {
 *   name: "John",
 *   posts: ["Who am I?", "I am a user."],
 * };
 *
 * // Validate if John is a valid 'User' type or not:
 * if (TUser.isValid(john)) {
 *   // TypeScript will infer John's type as 'User' in this block.
 * }
 *
 * // Or try to cast a value to the User type:
 * try {
 * const user = TUser.cast({ posts: ["Who am I?", "I am a user."] });
 *   // Type of user is User
 * } catch (error) {
 *   // error.message === 'Validation failed: Missing value at "id", expected type: string(UUID-v4)'
 * }
 * ```
 */
export class Guard<S extends Schema> extends Validator<SchemaType<S>> {
  readonly name;
  private readonly schema: Tree<Validator<unknown>>;

  /**
   *
   * @param schema  - Can be a single `Validator`, an other `Guard`, or an object of these types.
   */
  constructor(schema: S) {
    super();
    this.schema = this.resolveSchema(schema);
    this.name =
      this.schema.value instanceof Validator
        ? this.schema.value.name
        : JSON.stringify(this.expectedSchema);
  }

  get expectedSchema() {
    return this.schema.map((validator) => validator.name).value;
  }

  /**
   * The `isValid` method is a
   * [type predicate function](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates).
   *
   * @returns If the the given `value` is matching the `schema`.
   */
  isValid(value: any): value is SchemaType<S> {
    try {
      this.cast(value);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * The `cast` method will take any value and return the same value, but typed as the guarded type.
   * If the value isn't matching the schema, it will throw an `Error` containing the reason of failure.
   *
   * @example
   * ```ts
   * const TPost = new Guard({
   *   id: TStringUUID({version: 4});
   *   title: TString,
   *   body: TString,
   * });
   *
   * const TUser = new Guard({
   *   id: TStringUUID({version: 4});
   *   name: TString,
   *   posts: TArray(TPost),
   * });
   *
   * try {
   * const user = TUser.cast({ posts: ["Who am I?", "I am a user."] });
   *   // Type of user is User
   * } catch (error) {
   *   // error.message === 'Validation failed: Missing value at "id", expected type: string(UUID-v4)'
   * }
   * ```
   */
  cast(value: any): SchemaType<S> {
    if (this.schema.isLeafNode(this.schema.value)) {
      if (!this.schema.value.isValid(value))
        throw new InvalidValueError([], this.schema.value.name);
      return value as SchemaType<S>;
    }

    const result = this.schema.find(
      (validator, path) =>
        !has(value, path) || !validator.isValid(get(value, path))
    );

    if (!result) return value;

    const { path, value: validator } = result;
    if (!has(value, path)) throw new MissingValueError(path, validator.name);
    throw new InvalidValueError(path, validator.name);
  }

  private resolveSchema(schema: Schema): Tree<Validator<unknown>> {
    const tree = this.createTreeFromSchema(schema);
    return this.instantiateValidatorsInSchemaTree(tree);
  }

  private createTreeFromSchema(schema: Schema): Tree<ValidatorOrConstructor> {
    const isValidatorOrConstructor = (
      value: Schema
    ): value is Validator<unknown> | Constructor<Validator<unknown>> =>
      value instanceof Validator || typeof value === "function";

    return new Tree({
      definition: schema,
      isLeafNode: isValidatorOrConstructor,
    });
  }

  private instantiateValidatorsInSchemaTree(
    tree: Tree<ValidatorOrConstructor>
  ): Tree<Validator<unknown>> {
    return tree.map(
      (value) => {
        return value instanceof Validator ? value : new value();
      },
      (value): value is Validator<unknown> => value instanceof Validator
    );
  }
}
