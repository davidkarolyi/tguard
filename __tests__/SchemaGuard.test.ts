import { ValidationError } from "../src/errors";
import { SchemaGuard } from "../src/SchemaGuard";
import { Guard } from "../src/types";
import { TNumber, TString } from "../src/guards";

describe("SchemaGuard", () => {
  describe("constructor", () => {
    it("can accept a schema", () => {
      expect(() => new SchemaGuard({ name: TString })).not.toThrow();
      expect(() => new SchemaGuard(TString)).not.toThrow();
    });

    it("returns an instance of a Validator", () => {
      expect(new SchemaGuard({ name: TString })).toBeInstanceOf(Guard);
    });
  });

  describe("name", () => {
    describe("when a single validator is the schema", () => {
      it("is the name of the validator", () => {
        const guard = new SchemaGuard(TString);
        expect(guard.name).toBe("string");
      });
    });

    describe("when a schema object were provided", () => {
      it("is the object representation of the schema", () => {
        const guard = new SchemaGuard({ name: TString, age: TNumber });
        expect(guard.name).toBe('{"name":"string","age":"number"}');
      });
    });
  });

  describe("isValid", () => {
    describe("when used with a single validator", () => {
      it("returns true, if the validator accepts the value", () => {
        const guard = new SchemaGuard(TString);
        expect(guard.isValid("foo")).toBe(true);
      });

      it("returns false, if the validator rejects the value", () => {
        const guard = new SchemaGuard(TString);
        expect(guard.isValid(10)).toBe(false);
      });
    });

    describe("when used with a schema", () => {
      it("returns false, when the input is not an object", () => {
        const guard = new SchemaGuard({ name: TString });
        expect(guard.isValid("")).toBe(false);
      });

      it("returns false, when there is a missing field in the input object", () => {
        const guard = new SchemaGuard({ name: TString });
        expect(guard.isValid({})).toBe(false);
      });

      it("returns false, when there is an invalid field in the input object", () => {
        const guard = new SchemaGuard({ name: TString });
        expect(guard.isValid({ name: 10 })).toBe(false);
      });

      describe("with nested schema", () => {
        it("returns false, when there is a missing field in a nested schema", () => {
          const guard = new SchemaGuard({
            name: TString,
            cart: { carrots: TNumber },
          });

          expect(guard.isValid({ name: "John", cart: {} })).toBe(false);
        });

        it("returns true, when the input matches the schema", () => {
          const guard = new SchemaGuard({
            name: TString,
            cart: { carrots: TNumber },
          });

          expect(
            guard.isValid({ name: "John", cart: { carrots: 10, bananas: 6 } })
          ).toBe(true);
        });
      });
    });
  });

  describe("cast", () => {
    describe("when the schema is a single validator", () => {
      describe("when the schema matches the input", () => {
        it("returns the given value", () => {
          const guard = new SchemaGuard(TString);
          expect(guard.cast("foo")).toBe("foo");
        });
      });

      describe("when the schema doesn't match the input", () => {
        it("throws an error, including path and expected type", () => {
          const guard = new SchemaGuard(TNumber);
          try {
            guard.cast("foo");
            throw new Error("Didn't throw an error");
          } catch (error: any) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(error.message).toBe(
              "Validation failed: Invalid value, expected type: number"
            );
            expect(error.path).toEqual([]);
            expect(error.expectedType).toEqual("number");
          }
        });
      });
    });

    describe("when the schema is a validator tree", () => {
      const guard = new SchemaGuard({
        name: TString,
        cart: { peach: TNumber },
      });

      describe("when the schema matches the input", () => {
        it("returns the given value", () => {
          const value = { name: "John", cart: { peach: 2 } };
          expect(guard.cast(value)).toEqual(value);
        });
      });

      describe("when the schema doesn't match the input", () => {
        it("throws an error, including path and expected type", () => {
          const value = { name: "John", cart: { melon: 4 } };
          try {
            guard.cast(value);
            throw new Error("Didn't throw an error");
          } catch (error: any) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(error.message).toBe(
              'Validation failed: Missing value at "cart.peach", expected type: number'
            );
            expect(error.path).toEqual(["cart", "peach"]);
            expect(error.expectedType).toEqual("number");
          }
        });
      });
    });
  });
});
