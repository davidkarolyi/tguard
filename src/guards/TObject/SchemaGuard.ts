import has from "lodash/has";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { Tree } from "./Tree";
import { MissingValueError, InvalidValueError } from "../../errors";
import TAnyObject from "../TAnyObject";
import Guard from "../../Guard";
import { SchemaType, Schema } from "./types";

export class SchemaGuard<S extends Schema> extends Guard<SchemaType<S>> {
  readonly name: string;
  private readonly schema: Tree<Guard<unknown>>;

  constructor(schema: S) {
    super();
    this.schema = this.createTreeFromSchema(schema);
    this.name =
      this.schema.value instanceof Guard
        ? this.schema.value.name
        : JSON.stringify(this.schema.map((guard) => guard.name).value);
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

    if (typeof value !== "object") {
      throw new InvalidValueError([], this.name);
    }

    const result = this.schema.find((guard, path) => {
      return !has(value, path) || !guard.isValid(get(value, path));
    });

    if (!result) return value;

    const { path, value: guard } = result;
    if (!has(value, path)) throw new MissingValueError(path, guard.name);
    throw new InvalidValueError(path, guard.name);
  }

  private createTreeFromSchema(schema: Schema): Tree<Guard<unknown>> {
    return new Tree({
      definition: schema,
      isLeafNode: (value: Schema): value is Guard<unknown> =>
        value instanceof Guard || this.isEmptyObject(value),
    }).map(
      (value) => {
        if (this.isEmptyObject(value)) return TAnyObject;
        return value;
      },
      (value): value is Guard<unknown> => value instanceof Guard
    );
  }

  private isEmptyObject(value: any): boolean {
    return typeof value === "object" && value !== null && isEmpty(value);
  }
}
