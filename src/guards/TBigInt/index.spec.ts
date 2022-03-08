import TBigInt from ".";
import Guard from "../../Guard";

describe("TBigInt", () => {
  it("is an instance of Guard", () => {
    expect(TBigInt).toBeInstanceOf(Guard);
  });

  it("it's name is 'bigint'", () => {
    expect(TBigInt.name).toBe("bigint");
  });

  it("returns true if a bigint value was given", () => {
    const value = BigInt(10);
    expect(TBigInt.isValid(value)).toBe(true);
  });

  it("returns false if a non-bigint value was given", () => {
    expect(TBigInt.isValid(10)).toBe(false);
  });
});
