import { GuardDefinition } from "./types";

export function guard<T>(definition: GuardDefinition) {
  return (value: any): value is T => definitionAcceptsValue(definition, value);
}

function definitionAcceptsValue(
  definition: GuardDefinition,
  value: any
): boolean {
  if (typeof definition === "function") return definition(value);
  if (typeof value !== "object" || value === null) return false;

  for (const fieldName in definition) {
    const subdefinition = definition[fieldName];
    const fieldValue = value[fieldName];
    if (!definitionAcceptsValue(subdefinition, fieldValue)) return false;
  }
  return true;
}
