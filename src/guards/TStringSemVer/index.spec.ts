import TStringSemVer from ".";
import Guard from "../../Guard";

describe("TStringSemVer", () => {
  it("is an instance of Guard", () => {
    expect(TStringSemVer).toBeInstanceOf(Guard);
  });

  it("it's name is 'string(SemVer)'", () => {
    expect(TStringSemVer.name).toBe("string(SemVer)");
  });

  it("returns false, if the input is not a SemVer string", () => {
    expect(TStringSemVer.isValid("foobar")).toBe(false);
  });

  it("returns true, if the input is a SemVer string", () => {
    expect(TStringSemVer.isValid("1.0.7")).toBe(true);
  });
});
