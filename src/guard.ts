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

export type GuardType<G extends Guard<Schema>> = ValidatorType<G>;

export class Guard<S extends Schema> extends Validator<SchemaType<S>> {
  readonly name;
  readonly schema: Tree<Validator<unknown>>;

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

  isValid(value: any): value is SchemaType<S> {
    try {
      this.cast(value);
      return true;
    } catch {
      return false;
    }
  }

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
