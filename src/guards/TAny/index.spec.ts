import TAny from ".";
import Guard from "../../Guard";

describe("TAny", () => {
  it("is an instance of Guard", () => {
    expect(TAny).toBeInstanceOf(Guard);
  });

  it("it's name is 'any'", () => {
    expect(TAny.name).toBe("any");
  });

  it("returns true regardless of the input", () => {
    expect(TAny.isValid(null)).toBe(true);
    expect(TAny.isValid("")).toBe(true);
    expect(TAny.isValid(undefined)).toBe(true);
    expect(TAny.isValid(false)).toBe(true);
    expect(TAny.isValid({})).toBe(true);
    expect(TAny.isValid(0)).toBe(true);
  });
});
