import TIntegerAsString from ".";
import Guard from "../../Guard";

describe("TIntegerAsString", () => {
  it("is an instance of Guard", () => {
    expect(TIntegerAsString).toBeInstanceOf(Guard);
  });

  it("it's name is 'number'", () => {
    expect(TIntegerAsString.name).toBe("integer(as a string)");
  });

  it("returns false if a number was given", () => {
    expect(TIntegerAsString.isValid(0)).toBe(false);
  });

  it("returns false if the string is not an integer", () => {
    expect(TIntegerAsString.isValid("1.23")).toBe(false);
    expect(TIntegerAsString.isValid("")).toBe(false);
    expect(TIntegerAsString.isValid("01")).toBe(false);
    expect(TIntegerAsString.isValid("-0")).toBe(false);
    expect(TIntegerAsString.isValid("--1")).toBe(false);
    expect(TIntegerAsString.isValid("- 0")).toBe(false);
  });

  it("returns true if the string is a valid integer", () => {
    expect(TIntegerAsString.isValid("1")).toBe(true);
    expect(TIntegerAsString.isValid("-5")).toBe(true);
    expect(TIntegerAsString.isValid("0")).toBe(true);
  });
});
