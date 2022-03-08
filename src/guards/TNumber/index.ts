import TValidate from "../TValidate";

/**
 * Primitive guard that only accepts numbers.
 * Not accepts NaN.
 *
 * `guard.name`: `"number"`
 */
const TNumber = TValidate<number>(
  "number",
  (value) => typeof value === "number" && !isNaN(value)
);

export default TNumber;
