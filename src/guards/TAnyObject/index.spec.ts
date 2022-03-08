import TAnyObject from ".";
import Guard from "../../Guard";

describe("TAnyObject", () => {
  it("is an instance of Guard", () => {
    expect(TAnyObject).toBeInstanceOf(Guard);
  });

  it("it's name is 'object'", () => {
    expect(TAnyObject.name).toBe("object");
  });

  it("returns true if an object was given", () => {
    expect(TAnyObject.isValid({})).toBe(true);
    expect(TAnyObject.isValid({ a: 20 })).toBe(true);
  });

  it("returns false if not an object value was given", () => {
    expect(TAnyObject.isValid(() => 10)).toBe(false);
    expect(TAnyObject.isValid(null)).toBe(false);
    expect(TAnyObject.isValid(BigInt(100))).toBe(false);
  });
});
