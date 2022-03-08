import TNumberAsString from ".";
import Guard from "../../Guard";

describe("TNumberAsString", () => {
  it("is an instance of Guard", () => {
    expect(TNumberAsString).toBeInstanceOf(Guard);
  });

  it("it's name is 'number'", () => {
    expect(TNumberAsString.name).toBe("number(as a string)");
  });

  it("returns false if a number was given", () => {
    expect(TNumberAsString.isValid(0)).toBe(false);
  });

  it("returns false if the string isn't a valid number", () => {
    expect(TNumberAsString.isValid("foo")).toBe(false);
    expect(TNumberAsString.isValid("")).toBe(false);
    expect(TNumberAsString.isValid("-0")).toBe(false);
    expect(TNumberAsString.isValid("- 12")).toBe(false);
  });

  it("returns true if the string is a valid number", () => {
    expect(TNumberAsString.isValid("12.235")).toBe(true);
    expect(TNumberAsString.isValid("12")).toBe(true);
    expect(TNumberAsString.isValid("-12.34")).toBe(true);
    expect(TNumberAsString.isValid("-12")).toBe(true);
    expect(TNumberAsString.isValid("0")).toBe(true);
  });
});
