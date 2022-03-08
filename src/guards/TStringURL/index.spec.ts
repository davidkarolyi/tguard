import TStringURL from ".";
import Guard from "../../Guard";

describe("TStringURL", () => {
  it("is an instance of Guard", () => {
    expect(TStringURL).toBeInstanceOf(Guard);
  });

  it("it's name is 'string(URL)'", () => {
    expect(TStringURL.name).toBe("string(URL)");
  });

  it("returns false, if the input is not a URL", () => {
    expect(TStringURL.isValid("foobar")).toBe(false);
  });

  it("returns true, if the input is a URL", () => {
    expect(TStringURL.isValid("foobar.com")).toBe(true);
  });
});
