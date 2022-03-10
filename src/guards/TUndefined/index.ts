import TValidate from "../TValidate";

/**
 * Primitive guard that only accepts `undefined` values.
 *
 * `guard.name: "undefined"`
 */
const TUndefined = TValidate<undefined>(
  "undefined",
  (value) => typeof value === "undefined"
);

export default TUndefined;
