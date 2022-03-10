import TValidate from "../TValidate";

/**
 * Primitive guard that only accepts `function` values.
 *
 * `guard.name: "function"`
 */
const TFunction = TValidate<Function>(
  "function",
  (value) => typeof value === "function"
);

export default TFunction;
