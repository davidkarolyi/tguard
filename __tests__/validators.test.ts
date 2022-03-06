import { Guard } from "../src/guard";
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
  TNumberAsString,
  TAnd,
  TStringMatch,
} from "../src/validators";

describe("Validators", () => {
  describe("primitive types", () => {
    describe("TString", () => {
      it("is an instance of Validator", () => {
        expect(TString).toBeInstanceOf(Validator);
      });

      it("it's name is 'string'", () => {
        expect(TString.name).toBe("string");
      });

      it("returns true if a string was given", () => {
        expect(TString.isValid("")).toBe(true);
      });

      it("returns false if a non-string value was given", () => {
        expect(TString.isValid(0)).toBe(false);
      });
    });

    describe("TNumber", () => {
      it("is an instance of Validator", () => {
        expect(TNumber).toBeInstanceOf(Validator);
      });

      it("it's name is 'number'", () => {
        expect(TNumber.name).toBe("number");
      });

      it("returns true if a number was given", () => {
        expect(TNumber.isValid(0)).toBe(true);
      });

      it("returns false if a non-number value was given", () => {
        expect(TNumber.isValid("")).toBe(false);
      });
    });

    describe("TNumberAsString", () => {
      it("is an instance of Validator", () => {
        expect(TNumberAsString).toBeInstanceOf(Validator);
      });

      it("it's name is 'number'", () => {
        expect(TNumberAsString.name).toBe("number(as a string)");
      });

      it("returns false if a number was given", () => {
        expect(TNumberAsString.isValid(0)).toBe(false);
      });

      it("returns false if the string cannot be converted to a number", () => {
        expect(TNumberAsString.isValid("foo")).toBe(false);
      });

      it("returns true if the string can be converted to a number", () => {
        expect(TNumberAsString.isValid("12.235")).toBe(true);
      });
    });

    describe("TBoolean", () => {
      it("is an instance of Validator", () => {
        expect(TBoolean).toBeInstanceOf(Validator);
      });

      it("it's name is 'boolean'", () => {
        expect(TBoolean.name).toBe("boolean");
      });

      it("returns true if a boolean was given", () => {
        expect(TBoolean.isValid(false)).toBe(true);
      });

      it("returns false if a non-boolean value was given", () => {
        expect(TBoolean.isValid(undefined)).toBe(false);
      });
    });

    describe("TFunction", () => {
      it("is an instance of Validator", () => {
        expect(TFunction).toBeInstanceOf(Validator);
      });

      it("it's name is 'function'", () => {
        expect(TFunction.name).toBe("function");
      });

      it("returns true if a function was given", () => {
        expect(TFunction.isValid(() => 10)).toBe(true);
      });

      it("returns false if a non-function value was given", () => {
        expect(TFunction.isValid({})).toBe(false);
      });
    });

    describe("TObject", () => {
      it("is an instance of Validator", () => {
        expect(TObject).toBeInstanceOf(Validator);
      });

      it("it's name is 'object'", () => {
        expect(TObject.name).toBe("object");
      });

      it("returns true if an object was given", () => {
        expect(TObject.isValid({})).toBe(true);
      });

      it("returns false if not an object value was given", () => {
        expect(TObject.isValid(() => 10)).toBe(false);
      });

      it("returns true if null value was given", () => {
        expect(TObject.isValid(null)).toBe(true);
      });
    });

    describe("TUndefined", () => {
      it("is an instance of Validator", () => {
        expect(TUndefined).toBeInstanceOf(Validator);
      });

      it("it's name is 'undefined'", () => {
        expect(TUndefined.name).toBe("undefined");
      });

      it("returns true if undefined value was given", () => {
        expect(TUndefined.isValid(undefined)).toBe(true);
      });

      it("returns false if a not undefined value was given", () => {
        expect(TUndefined.isValid(null)).toBe(false);
      });
    });

    describe("TBigInt", () => {
      it("is an instance of Validator", () => {
        expect(TBigInt).toBeInstanceOf(Validator);
      });

      it("it's name is 'bigint'", () => {
        expect(TBigInt.name).toBe("bigint");
      });

      it("returns true if a bigint value was given", () => {
        const value = BigInt(10);
        expect(TBigInt.isValid(value)).toBe(true);
      });

      it("returns false if a non-bigint value was given", () => {
        expect(TBigInt.isValid(10)).toBe(false);
      });
    });

    describe("TNull", () => {
      it("is an instance of Validator", () => {
        expect(TNull).toBeInstanceOf(Validator);
      });

      it("it's name is 'null'", () => {
        expect(TNull.name).toBe("null");
      });

      it("returns true if a null value was given", () => {
        expect(TNull.isValid(null)).toBe(true);
      });

      it("returns false if a non-null value was given", () => {
        expect(TNull.isValid({})).toBe(false);
      });
    });

    describe("TAny", () => {
      it("is an instance of Validator", () => {
        expect(TAny).toBeInstanceOf(Validator);
      });

      it("it's name is 'any'", () => {
        expect(TAny.name).toBe("any");
      });

      it("returns true regardless of the input", () => {
        expect(TAny.isValid(null)).toBe(true);
        expect(TAny.isValid("")).toBe(true);
        expect(TAny.isValid(undefined)).toBe(true);
        expect(TAny.isValid(false)).toBe(true);
        expect(TAny.isValid({})).toBe(true);
        expect(TAny.isValid(0)).toBe(true);
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

    describe("TAnd", () => {
      const validator = TAnd(
        new Guard({ name: TString }),
        new Guard({ age: TNumber })
      );

      it("is an instance of Validator", () => {
        expect(validator).toBeInstanceOf(Validator);
      });

      it("it's name is '(<type1> & <type2> & ...)'", () => {
        expect(validator.name).toBe('({"name":"string"} & {"age":"number"})');
      });

      it("returns false, if at least one validator rejects the value", () => {
        expect(validator.isValid({ name: "John" })).toBe(false);
      });

      it("returns true, if none of the validators were rejected the value", () => {
        expect(validator.isValid({ name: "John", age: 25 })).toBe(true);
      });
    });

    describe("TStringMatch", () => {
      const validator = TStringMatch("contains 'match'", /match/);

      it("is an instance of Validator", () => {
        expect(validator).toBeInstanceOf(Validator);
      });

      it("it's name is 'string(<patterName>)'", () => {
        expect(validator.name).toBe("string(contains 'match')");
      });

      it("returns false, if the input didn't match the regexp", () => {
        expect(validator.isValid("foobar")).toBe(false);
      });

      it("returns true, if the input matches the regexp", () => {
        expect(validator.isValid("foomatchbar")).toBe(true);
      });
    });
  });
});
