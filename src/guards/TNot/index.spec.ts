import TNot from ".";
import Guard from "../../Guard";
import TString from "../TString";

describe("TNot", () => {
  const guard = TNot(TString);

  it("is an instance of Guard", () => {
    expect(guard).toBeInstanceOf(Guard);
  });

  it("it's name is '!<type>'", () => {
    expect(guard.name).toBe("!string");
  });

  it("returns true if false was returned by the guard", () => {
    expect(guard.isValid(10)).toBe(true);
  });

  it("returns false if true was returned by the guard", () => {
    expect(guard.isValid("")).toBe(false);
  });
});
