export interface IGuard<T> {
  accepts(value: any): value is T;
}

export type GuardDefinition = Validator | GuardDefinitionObject;

export interface GuardDefinitionObject {
  [fieldName: string]: Validator | GuardDefinitionObject;
}

export type Validator = (value: any) => boolean;
