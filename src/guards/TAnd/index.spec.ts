import TAnd from ".";
import Guard from "../../Guard";
import TNumber from "../TNumber";
import TObject from "../TObject";
import TString from "../TString";

describe("TAnd", () => {
  const guard = TAnd(TObject({ name: TString }), TObject({ age: TNumber }));

  it("is an instance of Guard", () => {
    expect(guard).toBeInstanceOf(Guard);
  });

  it("it's name is '(<type1> & <type2> & ...)'", () => {
    expect(guard.name).toBe('({"name":"string"} & {"age":"number"})');
  });

  it("returns false, if at least one guard rejects the value", () => {
    expect(guard.isValid({ name: "John" })).toBe(false);
  });

  it("returns true, if none of the guards were rejected the value", () => {
    expect(guard.isValid({ name: "John", age: 25 })).toBe(true);
  });
});
