import TValidate from "../TValidate";

/**
 * Primitive guard that only accepts `bigint` values.
 *
 * `guard.name: "bigint"`
 */
const TBigInt = TValidate<BigInt>(
  "bigint",
  (value) => typeof value === "bigint"
);

export default TBigInt;
