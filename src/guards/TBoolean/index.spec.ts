import TBoolean from ".";
import Guard from "../../Guard";

describe("TBoolean", () => {
  it("is an instance of Guard", () => {
    expect(TBoolean).toBeInstanceOf(Guard);
  });

  it("it's name is 'boolean'", () => {
    expect(TBoolean.name).toBe("boolean");
  });

  it("returns true if a boolean was given", () => {
    expect(TBoolean.isValid(false)).toBe(true);
  });

  it("returns false if a non-boolean value was given", () => {
    expect(TBoolean.isValid("true")).toBe(false);
    expect(TBoolean.isValid(undefined)).toBe(false);
  });
});
