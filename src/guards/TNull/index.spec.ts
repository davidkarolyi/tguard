import TNull from ".";
import Guard from "../../Guard";

describe("TNull", () => {
  it("is an instance of Guard", () => {
    expect(TNull).toBeInstanceOf(Guard);
  });

  it("it's name is 'null'", () => {
    expect(TNull.name).toBe("null");
  });

  it("returns true if a null value was given", () => {
    expect(TNull.isValid(null)).toBe(true);
  });

  it("returns false if a non-null value was given", () => {
    expect(TNull.isValid({})).toBe(false);
    expect(TNull.isValid(0)).toBe(false);
    expect(TNull.isValid(undefined)).toBe(false);
  });
});
