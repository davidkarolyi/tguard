import TStringUUID from ".";
import Guard from "../../Guard";

describe("TStringUUID", () => {
  it("is an instance of Guard", () => {
    expect(TStringUUID).toBeInstanceOf(Guard);
  });

  it("it's name is 'string(UUID)'", () => {
    expect(TStringUUID.name).toBe("string(UUID)");
  });

  it("returns false, if the input is not UUID", () => {
    expect(TStringUUID.isValid("foobar")).toBe(false);
  });

  it("returns true, if the input is UUID", () => {
    expect(TStringUUID.isValid("936a0dd4-cf7f-497d-a0cd-7c891416c719")).toBe(
      true
    );
  });
});
