import TOr from ".";
import TString from "../TString";
import TNumber from "../TNumber";
import TBoolean from "../TBoolean";
import TBigInt from "../TBigInt";
import Guard from "../../Guard";

describe("TOr", () => {
  const guard = TOr(TString, TNumber, TBoolean, TBigInt);

  it("is an instance of Guard", () => {
    expect(guard).toBeInstanceOf(Guard);
  });

  it("it's name is '(<type1> | <type2> | ...)'", () => {
    expect(guard.name).toBe("(string | number | boolean | bigint)");
  });

  it("returns true, if at least one guard matches the value", () => {
    expect(guard.isValid(10)).toBe(true);
  });

  it("returns false, if none of the guards match the value", () => {
    expect(guard.isValid({ foo: "bar" })).toBe(false);
  });
});
