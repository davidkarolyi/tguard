import TStringBase64 from ".";
import Guard from "../../Guard";

describe("TStringBase64", () => {
  const guard = TStringBase64({ urlSafe: false });

  it("is an instance of Guard", () => {
    expect(guard).toBeInstanceOf(Guard);
  });

  it("it's name is 'string(base64(?URL))'", () => {
    expect(guard.name).toBe("string(base64)");
    expect(TStringBase64({ urlSafe: true }).name).toBe("string(base64URL)");
  });

  it("returns false, if the input is not a base64 string", () => {
    expect(guard.isValid("foobar")).toBe(false);
  });

  it("returns true, if the input is a base64 string", () => {
    expect(guard.isValid("c29tZXRoaW5n")).toBe(true);
  });
});
