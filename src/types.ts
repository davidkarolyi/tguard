export type GuardDefinition = Validator | GuardDefinitionObject;

export interface GuardDefinitionObject {
  [fieldName: string]: Validator | GuardDefinitionObject;
}

export type Validator = (value: any) => boolean;
