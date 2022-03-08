import TStringPhoneNumber from ".";
import Guard from "../../Guard";

describe("TStringPhoneNumber", () => {
  it("is an instance of Guard", () => {
    expect(TStringPhoneNumber).toBeInstanceOf(Guard);
  });

  it("it's name is 'string(phone number)'", () => {
    expect(TStringPhoneNumber.name).toBe("string(phone number)");
  });

  it("returns false, if the input is not a phone number string", () => {
    expect(TStringPhoneNumber.isValid("foobar")).toBe(false);
  });

  it("returns true, if the input is a phone number string", () => {
    expect(TStringPhoneNumber.isValid("061555555")).toBe(true);
  });
});
