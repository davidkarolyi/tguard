import TStringEmail from ".";
import Guard from "../../Guard";

describe("TStringEmail", () => {
  it("is an instance of Guard", () => {
    expect(TStringEmail).toBeInstanceOf(Guard);
  });

  it("it's name is 'string(email)'", () => {
    expect(TStringEmail.name).toBe("string(email)");
  });

  it("returns false, if the input is not an email", () => {
    expect(TStringEmail.isValid("foobar")).toBe(false);
  });

  it("returns true, if the input is an email", () => {
    expect(TStringEmail.isValid("foobar@email.com")).toBe(true);
  });
});
