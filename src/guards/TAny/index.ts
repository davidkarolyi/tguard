import TValidate from "../TValidate";

/**
 * Guard that accepts any value.
 *
 * `guard.name`: `"any"`
 */
const TAny = TValidate<any>("any", () => true);

export default TAny;
