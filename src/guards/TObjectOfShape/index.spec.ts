import TObjectOfShape from ".";
import Guard from "../../Guard";
import TNumber from "../TNumber";
import TString from "../TString";
import TValidate from "../TValidate";

describe("TObjectOfShape", () => {
  const guard = TObjectOfShape({
    keys: TString,
    values: TNumber,
  });

  it("is an instance of Guard", () => {
    expect(guard).toBeInstanceOf(Guard);
  });

  it("returns true, if the given object has the correct shape", () => {
    expect(guard.isValid({ foo: 10 })).toBe(true);
  });

  it("it's name is '{[<keyType>]: <valueType>}'", () => {
    expect(guard.name).toBe("{ [string]: number }");
  });

  it("returns false, if the given value is not an object", () => {
    expect(guard.isValid(null)).toBe(false);
  });

  it("returns false, if the key is invalid", () => {
    const guard = TObjectOfShape({
      keys: TValidate("false", () => false),
      values: TNumber,
    });

    expect(guard.isValid({ foo: 10 })).toBe(false);
  });

  it("returns false, if one of the values are invalid", () => {
    expect(guard.isValid({ foo: "10" })).toBe(false);
  });
});
