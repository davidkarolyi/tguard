import TValidate from "../TValidate";

/**
 * Primitive guard that only accepts the JS type `bigint`.
 *
 * `guard.name`: `"bigint"`
 */
const TBigInt = TValidate<BigInt>(
  "bigint",
  (value) => typeof value === "bigint"
);

export default TBigInt;
