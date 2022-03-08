import TArray from ".";
import Guard from "../../Guard";
import TString from "../TString";

describe("TArray", () => {
  const guard = TArray(TString);

  it("is an instance of Guard", () => {
    expect(guard).toBeInstanceOf(Guard);
  });

  it("it's name is '<type>[]'", () => {
    expect(guard.name).toBe("string[]");
  });

  it("returns true if the provided value is a valid array", () => {
    expect(guard.isValid(["foo", "bar"])).toBe(true);
  });

  it("returns false if the provided value is not an array", () => {
    expect(guard.isValid({})).toBe(false);
  });

  it("returns false if one element is not valid", () => {
    expect(guard.isValid(["foo", "bar", 2])).toBe(false);
  });

  it("returns true, if the array is empty", () => {
    expect(guard.isValid([])).toBe(true);
  });

  describe("when options were provided", () => {
    const guard = TArray(TString, { minLength: 2, maxLength: 5 });

    it("it's name is '<type>[](minLength=<minLength>,maxLength=<maxLength>)'", () => {
      expect(guard.name).toBe("string[](minLength=2,maxLength=5)");
      expect(TArray(TString, { maxLength: 2 }).name).toBe(
        "string[](maxLength=2)"
      );
      expect(TArray(TString, { minLength: 2 }).name).toBe(
        "string[](minLength=2)"
      );
    });

    it("returns true if the provided array is within the range", () => {
      expect(guard.isValid(["foo", "bar", "baz"])).toBe(true);
    });

    it("returns false if the provided array is outside the range", () => {
      expect(guard.isValid(["foo"])).toBe(false);
      expect(guard.isValid(["foo", "bar", "baz", "foo", "bar", "baz"])).toBe(
        false
      );
    });
  });
});
