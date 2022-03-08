import TValidate from "../TValidate";

/**
 * Primitive guard that only accepts objects.
 * Does not accept null.
 *
 * `guard.name`: `"object"`
 */
const TAnyObject = TValidate<Object>(
  "object",
  (value) => typeof value === "object" && value !== null
);

export default TAnyObject;
