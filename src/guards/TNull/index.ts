import TValidate from "../TValidate";

/**
 * Guard that only accepts `null`.
 *
 * `guard.name: "null"`
 */
const TNull = TValidate<null>("null", (value) => value === null);

export default TNull;
