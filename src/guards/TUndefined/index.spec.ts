import TUndefined from ".";
import Guard from "../../Guard";

describe("TUndefined", () => {
  it("is an instance of Guard", () => {
    expect(TUndefined).toBeInstanceOf(Guard);
  });

  it("it's name is 'undefined'", () => {
    expect(TUndefined.name).toBe("undefined");
  });

  it("returns true if undefined value was given", () => {
    expect(TUndefined.isValid(undefined)).toBe(true);
  });

  it("returns false if a not undefined value was given", () => {
    expect(TUndefined.isValid(null)).toBe(false);
    expect(TUndefined.isValid(0)).toBe(false);
    expect(TUndefined.isValid({})).toBe(false);
  });
});
