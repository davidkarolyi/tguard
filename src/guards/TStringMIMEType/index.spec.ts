import TStringMIMEType from ".";
import Guard from "../../Guard";

describe("TStringMIMEType", () => {
  it("is an instance of Guard", () => {
    expect(TStringMIMEType).toBeInstanceOf(Guard);
  });

  it("it's name is 'string(MIME type)'", () => {
    expect(TStringMIMEType.name).toBe("string(MIME type)");
  });

  it("returns false, if the input is not a MIME type string", () => {
    expect(TStringMIMEType.isValid("foobar")).toBe(false);
  });

  it("returns true, if the input is a MIME type string", () => {
    expect(TStringMIMEType.isValid("application/json")).toBe(true);
  });
});
