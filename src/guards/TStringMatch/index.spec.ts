import TStringMatch from ".";
import Guard from "../../Guard";

describe("TStringMatch", () => {
  const guard = TStringMatch("contains 'match'", /match/);

  it("is an instance of Guard", () => {
    expect(guard).toBeInstanceOf(Guard);
  });

  it("it's name is 'string(<patterName>)'", () => {
    expect(guard.name).toBe("string(contains 'match')");
  });

  it("returns false, if the input didn't match the regexp", () => {
    expect(guard.isValid("foobar")).toBe(false);
  });

  it("returns true, if the input matches the regexp", () => {
    expect(guard.isValid("foomatchbar")).toBe(true);
  });
});
