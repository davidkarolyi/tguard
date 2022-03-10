import TValidate from "../TValidate";

/**
 * Primitive guard that only accepts `string` values.
 *
 * `guard.name: "string"`
 */
const TString = TValidate<string>(
  "string",
  (value) => typeof value === "string"
);

export default TString;
