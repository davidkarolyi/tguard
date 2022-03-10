import TValidate from "../TValidate";

/**
 * Primitive guard that only accepts `boolean` values.
 *
 * `guard.name: "boolean"`
 */
const TBoolean = TValidate<boolean>(
  "boolean",
  (value) => typeof value === "boolean"
);

export default TBoolean;
