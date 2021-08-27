import { Validator } from "../src/types";
import {
  TString,
  TNumber,
  TBoolean,
  TFunction,
  TObject,
  TUndefined,
  TBigInt,
  TNull,
  TAny,
  TArray,
  TObjectOfShape,
  TNot,
  TOr,
} from "../src/validators";

describe("Validators", () => {
  describe("primitive types", () => {
    describe("TString", () => {
      const validator = new TString();

      it("is an instance of Validator", () => {
        expect(validator).toBeInstanceOf(Validator);
      });

      it("it's name is 'string'", () => {
        expect(validator.name).toBe("string");
      });

      it("returns true if a string was given", () => {
        expect(validator.isValid("")).toBe(true);
      });

      it("returns false if a non-string value was given", () => {
        expect(validator.isValid(0)).toBe(false);
      });
    });

    describe("TNumber", () => {
      const validator = new TNumber();

      it("is an instance of Validator", () => {
        expect(validator).toBeInstanceOf(Validator);
      });

      it("it's name is 'number'", () => {
        expect(validator.name).toBe("number");
      });

      it("returns true if a number was given", () => {
        expect(validator.isValid(0)).toBe(true);
      });

      it("returns false if a non-number value was given", () => {
        expect(validator.isValid("")).toBe(false);
      });
    });

    describe("TBoolean", () => {
      const validator = new TBoolean();

      it("is an instance of Validator", () => {
        expect(validator).toBeInstanceOf(Validator);
      });

      it("it's name is 'boolean'", () => {
        expect(validator.name).toBe("boolean");
      });

      it("returns true if a boolean was given", () => {
        expect(validator.isValid(false)).toBe(true);
      });

      it("returns false if a non-boolean value was given", () => {
        expect(validator.isValid(undefined)).toBe(false);
      });
    });

    describe("TFunction", () => {
      const validator = new TFunction();

      it("is an instance of Validator", () => {
        expect(validator).toBeInstanceOf(Validator);
      });

      it("it's name is 'function'", () => {
        expect(validator.name).toBe("function");
      });

      it("returns true if a function was given", () => {
        expect(validator.isValid(() => 10)).toBe(true);
      });

      it("returns false if a non-function value was given", () => {
        expect(validator.isValid({})).toBe(false);
      });
    });

    describe("TObject", () => {
      const validator = new TObject();

      it("is an instance of Validator", () => {
        expect(validator).toBeInstanceOf(Validator);
      });

      it("it's name is 'object'", () => {
        expect(validator.name).toBe("object");
      });

      it("returns true if an object was given", () => {
        expect(validator.isValid({})).toBe(true);
      });

      it("returns false if not an object value was given", () => {
        expect(validator.isValid(() => 10)).toBe(false);
      });

      it("returns true if null value was given", () => {
        expect(validator.isValid(null)).toBe(true);
      });
    });

    describe("TUndefined", () => {
      const validator = new TUndefined();

      it("is an instance of Validator", () => {
        expect(validator).toBeInstanceOf(Validator);
      });

      it("it's name is 'undefined'", () => {
        expect(validator.name).toBe("undefined");
      });

      it("returns true if undefined value was given", () => {
        expect(validator.isValid(undefined)).toBe(true);
      });

      it("returns false if a not undefined value was given", () => {
        expect(validator.isValid(null)).toBe(false);
      });
    });

    describe("TBigInt", () => {
      const validator = new TBigInt();

      it("is an instance of Validator", () => {
        expect(validator).toBeInstanceOf(Validator);
      });

      it("it's name is 'bigint'", () => {
        expect(validator.name).toBe("bigint");
      });

      it("returns true if a bigint value was given", () => {
        const value = BigInt(10);
        expect(validator.isValid(value)).toBe(true);
      });

      it("returns false if a non-bigint value was given", () => {
        expect(validator.isValid(10)).toBe(false);
      });
    });

    describe("TNull", () => {
      const validator = new TNull();

      it("is an instance of Validator", () => {
        expect(validator).toBeInstanceOf(Validator);
      });

      it("it's name is 'null'", () => {
        expect(validator.name).toBe("null");
      });

      it("returns true if a null value was given", () => {
        expect(validator.isValid(null)).toBe(true);
      });

      it("returns false if a non-null value was given", () => {
        expect(validator.isValid({})).toBe(false);
      });
    });

    describe("TAny", () => {
      const validator = new TAny();

      it("is an instance of Validator", () => {
        expect(validator).toBeInstanceOf(Validator);
      });

      it("it's name is 'any'", () => {
        expect(validator.name).toBe("any");
      });

      it("returns true regardless of the input", () => {
        expect(validator.isValid(null)).toBe(true);
        expect(validator.isValid("")).toBe(true);
        expect(validator.isValid(undefined)).toBe(true);
        expect(validator.isValid(false)).toBe(true);
        expect(validator.isValid({})).toBe(true);
        expect(validator.isValid(0)).toBe(true);
      });
    });
  });

  describe("compound validators", () => {
    describe("TArray", () => {
      const validator = TArray(TString);

      it("is an instance of Validator", () => {
        expect(validator).toBeInstanceOf(Validator);
      });

      it("it's name is '<type>[]'", () => {
        expect(validator.name).toBe("string[]");
      });

      it("returns true if the provided value is a valid array", () => {
        expect(validator.isValid(["foo", "bar"])).toBe(true);
      });

      it("returns false if the provided value is not an array", () => {
        expect(validator.isValid({})).toBe(false);
      });

      it("returns false if one element is not valid", () => {
        expect(validator.isValid(["foo", "bar", 2])).toBe(false);
      });

      it("returns true, if the array is empty", () => {
        expect(validator.isValid([])).toBe(true);
      });
    });

    describe("TObjectOfShape", () => {
      const validator = TObjectOfShape({
        keys: TString,
        values: TNumber,
      });

      it("is an instance of Validator", () => {
        expect(validator).toBeInstanceOf(Validator);
      });

      it("returns true, if the given object has the correct shape", () => {
        expect(validator.isValid({ foo: 10 })).toBe(true);
      });

      it("it's name is '{[<keyType>]: <valueType>}'", () => {
        expect(validator.name).toBe("{ [string]: number }");
      });

      it("returns false, if the given value is not an object", () => {
        expect(validator.isValid(null)).toBe(false);
      });

      it("returns false, if the key is invalid", () => {
        const validator = TObjectOfShape({
          keys: class TFalse extends Validator<string> {
            readonly name = "false";
            isValid(value: any): value is string {
              return false;
            }
          },
          values: TNumber,
        });

        expect(validator.isValid({ foo: 10 })).toBe(false);
      });

      it("returns false, if one of the values is invalid", () => {
        expect(validator.isValid({ foo: "10" })).toBe(false);
      });
    });

    describe("TNot", () => {
      const validator = TNot(TString);

      it("is an instance of Validator", () => {
        expect(validator).toBeInstanceOf(Validator);
      });

      it("it's name is '!<type>'", () => {
        expect(validator.name).toBe("!string");
      });

      it("returns true if false was returned by the validator", () => {
        expect(validator.isValid(10)).toBe(true);
      });

      it("returns false if true was returned by the validator", () => {
        expect(validator.isValid("")).toBe(false);
      });
    });

    describe("TOr", () => {
      const validator = TOr(TString, TNumber, TBoolean, TBigInt);

      it("is an instance of Validator", () => {
        expect(validator).toBeInstanceOf(Validator);
      });

      it("it's name is '(<type1> | <type2> | ...)'", () => {
        expect(validator.name).toBe("(string | number | boolean | bigint)");
      });

      it("returns true, if at least one validator matches the value", () => {
        expect(validator.isValid(10)).toBe(true);
      });

      it("returns false, if none of the validators match the value", () => {
        expect(validator.isValid({ foo: "bar" })).toBe(false);
      });
    });
  });
});
