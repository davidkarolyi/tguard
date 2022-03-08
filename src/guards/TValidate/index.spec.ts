import TValidate from ".";
import Guard from "../../Guard";

describe("TValidate", () => {
  it("is an instance of Guard", () => {
    expect(TValidate("custom", () => true)).toBeInstanceOf(Guard);
  });

  it("it's name is the name provided as an argument", () => {
    expect(TValidate("custom", () => true).name).toBe("custom");
  });

  it("returns false, if the given function returns false", () => {
    expect(TValidate("custom", () => false).isValid("foobar")).toBe(false);
  });

  it("returns true, if the given function returns true", () => {
    expect(TValidate("custom", () => true).isValid("foobar")).toBe(true);
  });
});
