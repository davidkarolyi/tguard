import TValidate from "../TValidate";
import isUUID, { UUIDVersion } from "validator/lib/isUUID";

/**
 * Checks if the string is a valid UUID v4.
 *
 * @returns
 * A `Guard` which checks if the string is a valid v4 UUID.
 *
 * `guard.name: "string(UUID)"`
 *
 * @example
 * ```ts
 * TStringUUID.isValid("foobar"); // false
 * TStringUUID.isValid("936a0dd4-cf7f-497d-a0cd-7c891416c719"); // true
 * TStringUUID.name === "string(UUID)"; // true
 * ```
 */
const TStringUUID = TValidate<string>(
  `string(UUID)`,
  (value) => typeof value === "string" && isUUID(value, 4)
);

export default TStringUUID;
