import TNumber from ".";
import Guard from "../../Guard";

describe("TNumber", () => {
  it("is an instance of Guard", () => {
    expect(TNumber).toBeInstanceOf(Guard);
  });

  it("it's name is 'number'", () => {
    expect(TNumber.name).toBe("number");
  });

  it("returns true if a number was given", () => {
    expect(TNumber.isValid(0)).toBe(true);
    expect(TNumber.isValid(-12.23)).toBe(true);
    expect(TNumber.isValid(12.23)).toBe(true);
  });

  it("returns false if a non-number value was given", () => {
    expect(TNumber.isValid("")).toBe(false);
    expect(TNumber.isValid(NaN)).toBe(false);
  });
});
