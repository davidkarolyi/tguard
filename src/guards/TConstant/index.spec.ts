import TConstant from ".";
import Guard from "../../Guard";

describe("TConstant", () => {
  it("is an instance of Guard", () => {
    expect(TConstant(5)).toBeInstanceOf(Guard);
  });

  it("it's name is 'constant(<constant>)'", () => {
    expect(TConstant(5).name).toBe("constant(5)");
    expect(TConstant("foo").name).toBe('constant("foo")');
    expect(TConstant(BigInt(100)).name).toBe("constant(100)");
    expect(TConstant(true).name).toBe("constant(true)");
  });

  it("returns false, if the given value is not equal to the constant", () => {
    expect(TConstant("foo").isValid("foobar")).toBe(false);
    expect(TConstant(2).isValid(2.1)).toBe(false);
    expect(TConstant(true).isValid(false)).toBe(false);
    expect(TConstant(2).isValid("2")).toBe(false);
  });

  it("returns true, if the input is UUID", () => {
    expect(TConstant("foo").isValid("foo")).toBe(true);
    expect(TConstant(2).isValid(2)).toBe(true);
    expect(TConstant(false).isValid(false)).toBe(true);
    expect(TConstant("2").isValid("2")).toBe(true);
  });
});
