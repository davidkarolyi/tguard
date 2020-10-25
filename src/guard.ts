import { GuardDefinition, IGuard } from "./types";

export class Guard<T> implements IGuard<T> {
  constructor(private readonly definition: GuardDefinition) {}

  accepts(value: any): value is T {
    return this.valueSatisfiesDefinition(value, this.definition);
  }

  private valueSatisfiesDefinition(
    value: any,
    definition: GuardDefinition
  ): boolean {
    if (typeof definition === "function") return definition(value);
    if (typeof value !== "object" || value === null) return false;

    for (const fieldName in definition) {
      const subdefinition = definition[fieldName];
      const fieldValue = value[fieldName];
      if (!this.valueSatisfiesDefinition(fieldValue, subdefinition))
        return false;
    }
    return true;
  }
}
