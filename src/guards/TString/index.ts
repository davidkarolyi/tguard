import TValidate from "../TValidate";

/**
 * Primitive guard that only accepts the JS type `string`.
 *
 * `guard.name`: `string`
 */
const TString = TValidate<string>(
  "string",
  (value) => typeof value === "string"
);

export default TString;
