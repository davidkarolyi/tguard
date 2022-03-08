import TString from ".";
import Guard from "../../Guard";

describe("TString", () => {
  it("is an instance of Guard", () => {
    expect(TString).toBeInstanceOf(Guard);
  });

  it("it's name is 'string'", () => {
    expect(TString.name).toBe("string");
  });

  it("returns true if a string was given", () => {
    expect(TString.isValid("")).toBe(true);
  });

  it("returns false if a non-string value was given", () => {
    expect(TString.isValid(0)).toBe(false);
  });
});
