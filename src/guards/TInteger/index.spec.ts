import TInteger from ".";
import Guard from "../../Guard";

describe("TInteger", () => {
  it("is an instance of Guard", () => {
    expect(TInteger).toBeInstanceOf(Guard);
  });

  it("it's name is 'integer'", () => {
    expect(TInteger.name).toBe("integer");
  });

  it("returns true if a whole number was given", () => {
    expect(TInteger.isValid(1)).toBe(true);
    expect(TInteger.isValid(-12)).toBe(true);
  });

  it("returns false if not a whole number value was given", () => {
    expect(TInteger.isValid(1.2)).toBe(false);
    expect(TInteger.isValid(NaN)).toBe(false);
  });
});
