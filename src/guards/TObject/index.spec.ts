import TObject from ".";
import TNumber from "../TNumber";
import TArray from "../TArray";
import Guard from "../../Guard";
import TString from "../TString";
import TOr from "../TOr";

describe("TObject", () => {
  it("is an instance of Guard", () => {
    expect(TObject({})).toBeInstanceOf(Guard);
  });

  it("it's name is the object schema as a JSON", () => {
    expect(TObject({ name: TString, age: TNumber }).name).toBe(
      '{"name":"string","age":"number"}'
    );
    expect(
      TObject({ name: TString, age: TArray(TOr(TNumber, TString)) }).name
    ).toBe('{"name":"string","age":"(number | string)[]"}');
  });

  it("returns false, if the given value not matches the object schema", () => {
    expect(TObject({ foo: TString }).isValid({ foo: 5 })).toBe(false);
    expect(TObject({ foo: TString }).isValid(5)).toBe(false);
    expect(TObject({}).isValid(10)).toBe(false);
    expect(
      TObject({ foo: { bar: TNumber }, baz: TString }).isValid({
        foo: { bar: 10 },
        baz: 10,
      })
    ).toBe(false);
    expect(TObject({ foo: {} }).isValid({ foo: 10 })).toBe(false);
    expect(TObject({ foo: {} }).isValid({ foo: null })).toBe(false);
  });

  it("returns true, if the given value matches the object schema", () => {
    expect(TObject({ foo: TString }).isValid({ foo: "bar" })).toBe(true);
    expect(TObject({}).isValid({ foo: "bar" })).toBe(true);
    expect(TObject({}).isValid({})).toBe(true);
    expect(TObject({ foo: {} }).isValid({ foo: {} })).toBe(true);
    expect(TObject({ foo: {} }).isValid({ foo: { bar: 20 } })).toBe(true);
  });
});
