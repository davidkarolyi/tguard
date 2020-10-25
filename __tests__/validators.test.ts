import { IGuard } from "../src/types";
import {
  TAnd,
  TArray,
  TGuard,
  TNot,
  TOr,
  TAny,
  TBigInt,
  TBoolean,
  TFunction,
  TNull,
  TNumber,
  TObject,
  TString,
  TUndefined,
  TDefinition,
  TObjectOfShape,
} from "../src/validators";

describe("Validators", () => {
  describe("TString", () => {
    it("returns true if a string was given", () => {
      expect(TString("")).toBe(true);
    });

    it("returns false if a non-string value was given", () => {
      expect(TString(0)).toBe(false);
    });
  });

  describe("TNumber", () => {
    it("returns true if a number was given", () => {
      expect(TNumber(0)).toBe(true);
    });

    it("returns false if a non-number value was given", () => {
      expect(TNumber("")).toBe(false);
    });
  });

  describe("TBoolean", () => {
    it("returns true if a boolean was given", () => {
      expect(TBoolean(false)).toBe(true);
    });

    it("returns false if a non-boolean value was given", () => {
      expect(TBoolean(undefined)).toBe(false);
    });
  });

  describe("TFunction", () => {
    it("returns true if a function was given", () => {
      expect(TFunction(() => 10)).toBe(true);
    });

    it("returns false if a non-function value was given", () => {
      expect(TFunction({})).toBe(false);
    });
  });

  describe("TObject", () => {
    it("returns true if an object was given", () => {
      expect(TObject({})).toBe(true);
    });

    it("returns false if not an object value was given", () => {
      expect(TObject(() => 10)).toBe(false);
    });

    it("returns true if null value was given", () => {
      expect(TObject(null)).toBe(true);
    });
  });

  describe("TUndefined", () => {
    it("returns true if undefined value was given", () => {
      expect(TUndefined(undefined)).toBe(true);
    });

    it("returns false if a not undefined value was given", () => {
      expect(TUndefined(null)).toBe(false);
    });
  });

  describe("TBigInt", () => {
    it("returns true if a bigint value was given", () => {
      const value = BigInt(10);
      expect(TBigInt(value)).toBe(true);
    });

    it("returns false if a non-bigint value was given", () => {
      expect(TBigInt(10)).toBe(false);
    });
  });

  describe("TNull", () => {
    it("returns true if a null value was given", () => {
      expect(TNull(null)).toBe(true);
    });

    it("returns false if a non-null value was given", () => {
      expect(TNull({})).toBe(false);
    });
  });

  describe("TAny", () => {
    it("returns true regardless of the input", () => {
      expect(TAny(null)).toBe(true);
      expect(TAny("")).toBe(true);
      expect(TAny(undefined)).toBe(true);
      expect(TAny(false)).toBe(true);
      expect(TAny({})).toBe(true);
      expect(TAny(0)).toBe(true);
    });
  });

  describe("Logical operators", () => {
    describe("TNot", () => {
      it("returns true if false was returned by the validator", () => {
        const validator = TNot(jest.fn());
        expect(validator("")).toBe(true);
      });

      it("returns false if true was returned by the validator", () => {
        const validator = TNot(jest.fn().mockReturnValue(true));
        expect(validator("")).toBe(false);
      });
    });

    describe("TOr", () => {
      it("returns true if at least one true returned by a validator", () => {
        const validator = TOr(jest.fn(), jest.fn().mockReturnValue(true));
        expect(validator("")).toBe(true);
      });

      it("returns false if none of the validators returned true", () => {
        const validator = TOr(jest.fn(), jest.fn());
        expect(validator("")).toBe(false);
      });

      it("works with 2+ number of validators as arguments", () => {
        const validator = TOr(
          jest.fn(),
          jest.fn(),
          jest.fn().mockReturnValue(true),
          jest.fn()
        );
        expect(validator("")).toBe(true);
      });

      it("does not call further validators after got back a true from one", () => {
        const shouldNotCall = jest.fn();
        const shouldCall = jest.fn().mockReturnValue(true);
        TOr(jest.fn(), shouldCall, shouldNotCall)("");

        expect(shouldCall).toHaveBeenCalled();
        expect(shouldNotCall).not.toHaveBeenCalled();
      });
    });

    describe("TAnd", () => {
      it("returns false if at least one false returned by a validator", () => {
        const validator = TAnd(jest.fn().mockReturnValue(true), jest.fn());
        expect(validator("")).toBe(false);
      });

      it("returns true if all of the validators returned true", () => {
        const validator = TAnd(
          jest.fn().mockReturnValue(true),
          jest.fn().mockReturnValue(true)
        );
        expect(validator("")).toBe(true);
      });

      it("works with 2+ number of validators as arguments", () => {
        const validator = TAnd(
          jest.fn().mockReturnValue(true),
          jest.fn().mockReturnValue(true),
          jest.fn(),
          jest.fn().mockReturnValue(true)
        );
        expect(validator("")).toBe(false);
      });

      it("does not call further validators after got back a false from one", () => {
        const shouldNotCall = jest.fn().mockReturnValue(true);
        const shouldCall = jest.fn();
        TAnd(jest.fn().mockReturnValue(true), shouldCall, shouldNotCall)("");

        expect(shouldCall).toHaveBeenCalled();
        expect(shouldNotCall).not.toHaveBeenCalled();
      });
    });
  });

  describe("TGuard", () => {
    it("creates a validator function", () => {
      const guard = ({ accepts: jest.fn() } as unknown) as IGuard<any>;
      expect(typeof TGuard(guard)).toBe("function");
    });

    it("calls the provided guard", () => {
      const guard = ({ accepts: jest.fn() } as unknown) as IGuard<any>;
      TGuard(guard)(10);

      expect(guard.accepts).toHaveBeenCalledWith(10);
    });

    it("returns the same value as the provided guard", () => {
      const guard = ({
        accepts: jest.fn().mockReturnValue(true),
      } as unknown) as IGuard<any>;
      const validator = TGuard(guard);

      expect(validator("")).toBe(true);
    });
  });

  describe("TDefinition", () => {
    it("creates a validator function", () => {
      const validator = TDefinition(jest.fn());
      expect(typeof validator).toBe("function");
    });

    it("calls single validator of the definition", () => {
      const definition = jest.fn();
      TDefinition(definition)(10);

      expect(definition).toHaveBeenCalledWith(10);
    });

    it("calls all validators of the definition", () => {
      const definition = {
        foo: jest.fn().mockReturnValue(true),
        bar: jest.fn().mockReturnValue(true),
      };
      TDefinition(definition)({ foo: 1, bar: 2 });

      expect(definition.foo).toHaveBeenCalledWith(1);
      expect(definition.bar).toHaveBeenCalledWith(2);
    });
  });

  describe("TArray", () => {
    it("creates a validator function", () => {
      const validator = TArray(jest.fn());
      expect(typeof validator).toBe("function");
    });

    it("returns false if the provided value is not an array", () => {
      const itemValidator = jest.fn().mockReturnValue(true);
      const validator = TArray(itemValidator);

      expect(validator({})).toBe(false);
    });

    it("does not call item validator, if the provided value is not an array", () => {
      const itemValidator = jest.fn();
      TArray(itemValidator)({});

      expect(itemValidator).not.toHaveBeenCalled();
    });

    it("returns true, if the provided array is empty, regardless of the item validator", () => {
      const itemValidator = jest.fn();
      const validator = TArray(itemValidator);

      expect(validator([])).toBe(true);
    });

    it("does not call item validator, if the provided array empty", () => {
      const itemValidator = jest.fn();
      TArray(itemValidator)([]);

      expect(itemValidator).not.toHaveBeenCalled();
    });

    it("calls item validator on all items", () => {
      const itemValidator = jest.fn().mockReturnValue(true);
      TArray(itemValidator)([1, 2, 3]);

      expect(itemValidator).toHaveBeenCalledTimes(3);
    });

    it("stops immediately after found an invalid item", () => {
      const itemValidator = jest
        .fn()
        .mockImplementation((value) => value !== 2);
      TArray(itemValidator)([1, 2, 3]);

      expect(itemValidator).toHaveBeenCalledTimes(2);
    });

    it("returns false if there is at least one invalid item", () => {
      const itemValidator = jest
        .fn()
        .mockImplementation((value) => value !== 2);
      const validator = TArray(itemValidator);

      expect(validator([1, 2, 3])).toBe(false);
    });

    it("returns true if all items are valid", () => {
      const itemValidator = jest.fn().mockReturnValue(true);
      const validator = TArray(itemValidator);

      expect(validator([1, 2, 3])).toBe(true);
    });
  });

  describe("TObjectOfShape", () => {
    it("creates a validator function", () => {
      const shape = {
        keys: jest.fn(),
        values: jest.fn(),
      };
      const validator = TObjectOfShape(shape);

      expect(typeof validator).toBe("function");
    });

    it("returns false if the given value is not an object", () => {
      const shape = {
        keys: jest.fn(),
        values: jest.fn(),
      };
      const validator = TObjectOfShape(shape);

      expect(validator(null)).toBe(false);
    });

    it("returns true if the given value is {}", () => {
      const shape = {
        keys: jest.fn(),
        values: jest.fn(),
      };
      const validator = TObjectOfShape(shape);

      expect(validator({})).toBe(true);
    });

    it("calls shape validators with correct arguments", () => {
      const shape = {
        keys: jest.fn().mockReturnValue(true),
        values: jest.fn(),
      };
      TObjectOfShape(shape)({
        foo: 1,
      });

      expect(shape.keys).toHaveBeenCalledWith("foo");
      expect(shape.values).toHaveBeenCalledWith(1);
    });

    it("calls all shape validators", () => {
      const shape = {
        keys: jest.fn().mockReturnValue(true),
        values: jest.fn().mockReturnValue(true),
      };
      TObjectOfShape(shape)({
        foo: 1,
        bar: 2,
      });

      expect(shape.keys).toHaveBeenCalledTimes(2);
      expect(shape.values).toHaveBeenCalledTimes(2);
    });

    it("stops immadiately after got a false from a shape validator", () => {
      const shape = {
        keys: jest.fn().mockReturnValue(true),
        values: jest.fn(),
      };
      TObjectOfShape(shape)({
        foo: 1,
        bar: 2,
      });

      expect(shape.keys).toHaveBeenCalledTimes(1);
      expect(shape.values).toHaveBeenCalledTimes(1);
    });

    it("returns false if a key is invalid", () => {
      const shape = {
        keys: jest.fn(),
        values: jest.fn().mockReturnValue(true),
      };
      const validator = TObjectOfShape(shape);

      expect(validator({ foo: 1 })).toBe(false);
    });

    it("returns false if a value is invalid", () => {
      const shape = {
        keys: jest.fn().mockReturnValue(true),
        values: jest.fn(),
      };
      const validator = TObjectOfShape(shape);

      expect(validator({ foo: 1 })).toBe(false);
    });

    it("returns true if both keys and values are all valid", () => {
      const shape = {
        keys: jest.fn().mockReturnValue(true),
        values: jest.fn().mockReturnValue(true),
      };
      const validator = TObjectOfShape(shape);

      expect(validator({ foo: 1 })).toBe(true);
    });
  });
});
