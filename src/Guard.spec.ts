import { ValidationError } from "./errors";
import TValidate from "./guards/TValidate";

describe("Guard", () => {
  describe("cast", () => {
    describe("when the validation fails", () => {
      it("should throw a ValidationError error", () => {
        expect(() => {
          TValidate("typename", () => false).cast("foo");
        }).toThrow(ValidationError);
        expect(() => {
          TValidate("typename", () => false).cast("foo");
        }).toThrow("Validation failed: Invalid value, expected type: typename");
      });
    });

    describe("when the validation passes", () => {
      it("should not throw an error", () => {
        expect(() => {
          TValidate<string>("typename", () => true).cast("foo");
        }).not.toThrow();
      });

      it("should return the same value", () => {
        expect(TValidate<string>("typename", () => true).cast("foo")).toBe(
          "foo"
        );
      });
    });
  });
});
