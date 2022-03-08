import TStringJWT from ".";
import Guard from "../../Guard";

describe("TStringJWT", () => {
  it("is an instance of Guard", () => {
    expect(TStringJWT).toBeInstanceOf(Guard);
  });

  it("it's name is 'string(JWT)'", () => {
    expect(TStringJWT.name).toBe("string(JWT)");
  });

  it("returns false, if the input is not a JWT string", () => {
    expect(TStringJWT.isValid("foobar")).toBe(false);
  });

  it("returns true, if the input is a JWT string", () => {
    expect(
      TStringJWT.isValid(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      )
    ).toBe(true);
  });
});
