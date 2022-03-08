import TFunction from ".";
import Guard from "../../Guard";

describe("TFunction", () => {
  it("is an instance of Guard", () => {
    expect(TFunction).toBeInstanceOf(Guard);
  });

  it("it's name is 'function'", () => {
    expect(TFunction.name).toBe("function");
  });

  it("returns true if a function was given", () => {
    expect(TFunction.isValid(() => 10)).toBe(true);
    expect(
      TFunction.isValid(() => {
        const _ = 10;
      })
    ).toBe(true);
    expect(
      TFunction.isValid(async () => {
        const _ = 10;
      })
    ).toBe(true);
  });

  it("returns false if a non-function value was given", () => {
    expect(TFunction.isValid({})).toBe(false);
    expect(TFunction.isValid(10)).toBe(false);
    expect(TFunction.isValid(true)).toBe(false);
  });
});
