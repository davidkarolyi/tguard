import TStringJSON from ".";
import Guard from "../../Guard";

describe("TStringJSON", () => {
  it("is an instance of Guard", () => {
    expect(TStringJSON).toBeInstanceOf(Guard);
  });

  it("it's name is 'string(JSON)'", () => {
    expect(TStringJSON.name).toBe("string(JSON)");
  });

  it("returns false, if the input is not a JSON string", () => {
    expect(TStringJSON.isValid("foobar")).toBe(false);
  });

  it("returns true, if the input is a JSON string", () => {
    expect(TStringJSON.isValid('{"foo": 2}')).toBe(true);
  });
});
