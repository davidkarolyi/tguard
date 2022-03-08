import Guard, { GuardedType } from "../../Guard";

export type Schema<T = any> = ObjectSchema | Guard<T>;

/**
 * Infers the type, that the given `Schema` represents.
 */
export type SchemaType<C extends Schema> = C extends Guard<unknown>
  ? GuardedType<C>
  : C extends {
      [fieldName: string]: Schema;
    }
  ? { [Property in keyof C]: SchemaType<C[Property]> }
  : unknown;

export type ObjectSchema = {
  [fieldName: string]: ObjectSchema | Guard<unknown>;
};
