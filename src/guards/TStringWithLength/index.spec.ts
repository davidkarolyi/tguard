import TStringWithLength from ".";
import Guard from "../../Guard";

describe("TStringWithLength", () => {
  const guard = TStringWithLength({ minLength: 5 });

  it("is an instance of Guard", () => {
    expect(guard).toBeInstanceOf(Guard);
  });

  it("it's name is 'string(minLength=<minLength>,maxLength=<maxLength>)'", () => {
    expect(guard.name).toBe("string(minLength=5)");
    expect(TStringWithLength({ minLength: 5, maxLength: 10 }).name).toBe(
      "string(minLength=5,maxLength=10)"
    );
    expect(TStringWithLength({ maxLength: 10 }).name).toBe(
      "string(maxLength=10)"
    );
  });

  it("returns false, if the input is not a string of the given length constraint", () => {
    expect(guard.isValid("1234")).toBe(false);
  });

  it("returns true, if the input is a string of the given length constraint", () => {
    expect(guard.isValid("123456")).toBe(true);
  });
});
