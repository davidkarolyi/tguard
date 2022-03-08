import TValidate from "../TValidate";

/**
 * Primitive guard that only accepts the JS type `undefined`.
 *
 * `guard.name`: `"undefined"`
 */
const TUndefined = TValidate<undefined>(
  "undefined",
  (value) => typeof value === "undefined"
);

export default TUndefined;
