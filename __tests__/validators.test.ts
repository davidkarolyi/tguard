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
  TStringBase64,
  TStringEmail,
  TStringISODate,
  TStringJSON,
  TStringJWT,
  TStringMIMEType,
  TStringPhoneNumber,
  TStringOfLength,
  TStringSemVer,
  TStringURL,
  TStringUUID,
  TValidate,
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

    describe("TStringBase64", () => {
      const validator = TStringBase64({ urlSafe: false });

      it("is an instance of Validator", () => {
        expect(validator).toBeInstanceOf(Validator);
      });

      it("it's name is 'string(base64(?URL))'", () => {
        expect(validator.name).toBe("string(base64)");
        expect(TStringBase64({ urlSafe: true }).name).toBe("string(base64URL)");
      });

      it("returns false, if the input is not a base64 string", () => {
        expect(validator.isValid("foobar")).toBe(false);
      });

      it("returns true, if the input is a base64 string", () => {
        expect(validator.isValid("c29tZXRoaW5n")).toBe(true);
      });
    });

    describe("TStringEmail", () => {
      it("is an instance of Validator", () => {
        expect(TStringEmail).toBeInstanceOf(Validator);
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

    describe("TStringISODate", () => {
      it("is an instance of Validator", () => {
        expect(TStringISODate).toBeInstanceOf(Validator);
      });

      it("it's name is 'string(date)'", () => {
        expect(TStringISODate.name).toBe("string(date)");
      });

      it("returns false, if the input is not a ISO date string", () => {
        expect(TStringISODate.isValid("foobar")).toBe(false);
      });

      it("returns true, if the input is a ISO date string", () => {
        expect(TStringISODate.isValid("2022-03-06T22:01:41.160Z")).toBe(true);
      });
    });

    describe("TStringJSON", () => {
      it("is an instance of Validator", () => {
        expect(TStringJSON).toBeInstanceOf(Validator);
      });

      it("it's name is 'string(JSON)'", () => {
        expect(TStringJSON.name).toBe("string(JSON)");
      });

      it("returns false, if the input is not a JSON string", () => {
        expect(TStringJSON.isValid("foobar")).toBe(false);
      });

      it("returns true, if the input is a JSON string", () => {
        expect(TStringJSON.isValid('{"foo": 2}')).toBe(true);
      });
    });

    describe("TStringJWT", () => {
      it("is an instance of Validator", () => {
        expect(TStringJWT).toBeInstanceOf(Validator);
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

    describe("TStringMIMEType", () => {
      it("is an instance of Validator", () => {
        expect(TStringMIMEType).toBeInstanceOf(Validator);
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

    describe("TStringPhoneNumber", () => {
      it("is an instance of Validator", () => {
        expect(TStringPhoneNumber).toBeInstanceOf(Validator);
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

    describe("TStringSemVer", () => {
      it("is an instance of Validator", () => {
        expect(TStringSemVer).toBeInstanceOf(Validator);
      });

      it("it's name is 'string(SemVer)'", () => {
        expect(TStringSemVer.name).toBe("string(SemVer)");
      });

      it("returns false, if the input is not a SemVer string", () => {
        expect(TStringSemVer.isValid("foobar")).toBe(false);
      });

      it("returns true, if the input is a SemVer string", () => {
        expect(TStringSemVer.isValid("1.0.7")).toBe(true);
      });
    });

    describe("TStringOfLength", () => {
      const validator = TStringOfLength({ min: 5 });

      it("is an instance of Validator", () => {
        expect(validator).toBeInstanceOf(Validator);
      });

      it("it's name is 'string([min=<min>][,max=<max>])'", () => {
        expect(validator.name).toBe("string(min=5)");
        expect(TStringOfLength({ min: 5, max: 10 }).name).toBe(
          "string(min=5,max=10)"
        );
        expect(TStringOfLength({ max: 10 }).name).toBe("string(max=10)");
      });

      it("returns false, if the input is not a string of the given length constraint", () => {
        expect(validator.isValid("1234")).toBe(false);
      });

      it("returns true, if the input is a string of the given length constraint", () => {
        expect(validator.isValid("123456")).toBe(true);
      });
    });

    describe("TStringURL", () => {
      it("is an instance of Validator", () => {
        expect(TStringURL).toBeInstanceOf(Validator);
      });

      it("it's name is 'string(URL)'", () => {
        expect(TStringURL.name).toBe("string(URL)");
      });

      it("returns false, if the input is not a URL", () => {
        expect(TStringURL.isValid("foobar")).toBe(false);
      });

      it("returns true, if the input is a URL", () => {
        expect(TStringURL.isValid("foobar.com")).toBe(true);
      });
    });

    describe("TStringUUID", () => {
      const validator = TStringUUID({ version: 4 });

      it("is an instance of Validator", () => {
        expect(validator).toBeInstanceOf(Validator);
      });

      it("it's name is 'string(UUID-v4)'", () => {
        expect(validator.name).toBe("string(UUID-v4)");
        expect(TStringUUID({ version: "all" }).name).toBe("string(UUID-all)");
      });

      it("returns false, if the input is not UUID", () => {
        expect(validator.isValid("foobar")).toBe(false);
      });

      it("returns true, if the input is UUID", () => {
        expect(validator.isValid("936a0dd4-cf7f-497d-a0cd-7c891416c719")).toBe(
          true
        );
      });
    });

    describe("TValidate", () => {
      it("is an instance of Validator", () => {
        expect(TValidate("custom", () => true)).toBeInstanceOf(Validator);
      });

      it("it's name is the name provided as an argument", () => {
        expect(TValidate("custom", () => true).name).toBe("custom");
      });

      it("returns false, if the given function return false", () => {
        expect(TValidate("custom", () => false).isValid("foobar")).toBe(false);
      });

      it("returns true, if the input is UUID", () => {
        expect(TValidate("custom", () => true).isValid("foobar")).toBe(true);
      });
    });
  });
});
