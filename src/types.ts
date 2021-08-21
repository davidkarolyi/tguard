import { TreeDefinition } from "./tree";

export abstract class Validator<T> {
  abstract readonly name: string;
  abstract isValid(value: any): value is T;
}

export type ValidatorOrConstructor<T = unknown> =
  | Validator<T>
  | Constructor<Validator<T>>;

export type ValidatorType<C extends Validator<unknown>> = C extends Validator<
  infer T
>
  ? T
  : unknown;

export type Schema = TreeDefinition<ValidatorOrConstructor<any>>;

export type SchemaType<C extends Schema> = C extends Constructor<
  Validator<unknown>
>
  ? ValidatorType<InstanceType<C>>
  : C extends Validator<unknown>
  ? ValidatorType<C>
  : C extends {
      [fieldName: string]: Schema;
    }
  ? { [Property in keyof C]: SchemaType<C[Property]> }
  : unknown;

export type ArrayType<C extends Array<unknown>> = C extends Array<infer T>
  ? T
  : unknown;

export type Constructor<T> = new () => T;
