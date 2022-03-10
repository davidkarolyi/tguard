import Guard from "../../Guard";

/**
 * Creates a custom `Guard` from the given params.
 *
 * @param name - The name of the type this guard will guard.
 * @param isValid - A function, which decides if a given value is valid or not.
 *
 * @typeParam T - The type the created guard will guard.
 *
 * > ⚠️ Don't forget to provide `T` type parameter!
 *
 * @example
 * Defining a guard that validates if a number is bigger than 10:
 * ```ts
 * const TBiggerThan10 = TValidate<number>(
 *   "number(bigger than 10)",
 *   (value) => typeof value === "number" && value > 10
 * );
 * ```
 */
export default function TValidate<T = never>(
  name: string,
  isValid: (value: any) => boolean
): Guard<T> {
  return new GenericGuard(name, (value: any): value is T => isValid(value));
}

class GenericGuard<T> extends Guard<T> {
  readonly name: string;
  isValid: (value: any) => value is T;

  constructor(name: string, isValid: (value: any) => value is T) {
    super();
    this.name = name;
    this.isValid = isValid.bind(this);
  }
}
