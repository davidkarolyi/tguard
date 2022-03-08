import TStringISODate from ".";
import Guard from "../../Guard";

describe("TStringISODate", () => {
  it("is an instance of Guard", () => {
    expect(TStringISODate).toBeInstanceOf(Guard);
  });

  it("it's name is 'string(date)'", () => {
    expect(TStringISODate.name).toBe("string(date)");
  });

  it("returns false, if the input is not a ISO date string", () => {
    expect(TStringISODate.isValid("foobar")).toBe(false);
  });

  it("returns true, if the input is a ISO date string", () => {
    expect(TStringISODate.isValid("2022-03-06T22:01:41.160Z")).toBe(true);
  });
});
