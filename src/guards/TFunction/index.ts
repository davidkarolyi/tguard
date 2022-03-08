import TValidate from "../TValidate";

/**
 * Primitive guard that only accepts the JS type `function`.
 *
 * `guard.name`: `"function"`
 */
const TFunction = TValidate<Function>(
  "function",
  (value) => typeof value === "function"
);

export default TFunction;
