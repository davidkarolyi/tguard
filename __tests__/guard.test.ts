import { Guard } from "../src/guard";

describe("Guard class", () => {
  describe("Guard.matches()", () => {
    it("calls single validator with primitive type", () => {
      const validator = jest.fn();
      new Guard(validator).accepts(10);

      expect(validator).toHaveBeenCalledWith(10);
    });

    it("returns false, when definition is an object, but input is not", () => {
      const definition = { foo: jest.fn() };
      const actual = new Guard(definition).accepts(10);

      expect(actual).toBe(false);
    });

    it("returns immediatelly after got a falsy validation", () => {
      const definition = { foo: jest.fn(), bar: jest.fn() };
      new Guard(definition).accepts({});

      expect(definition.foo).toBeCalledTimes(1);
      expect(definition.bar).not.toHaveBeenCalled();
    });

    it("validates all fields", () => {
      const definition = {
        foo: {
          a: jest.fn().mockReturnValue(true),
          b: jest.fn().mockReturnValue(true),
        },
        bar: jest.fn().mockReturnValue(true),
      };
      new Guard(definition).accepts({ foo: { a: 1, b: 2 }, bar: 3 });

      expect(definition.foo.a).toHaveBeenCalledWith(1);
      expect(definition.foo.b).toHaveBeenCalledWith(2);
      expect(definition.bar).toHaveBeenCalledWith(3);
    });

    it("returns true after validated all fields", () => {
      const definition = {
        foo: jest.fn().mockReturnValue(true),
        bar: jest.fn().mockReturnValue(true),
      };
      const actual = new Guard(definition).accepts({ foo: 1, bar: 2 });

      expect(actual).toBe(true);
    });
  });

  describe("Guard.createPredicate()", () => {
    it("returns a type predicate function", () => {
      const predicateFn = Guard.createPredicate(jest.fn());
      expect(typeof predicateFn).toBe("function");
    });

    it("calls single validator in definition", () => {
      const validator = jest.fn();
      const predicateFn = Guard.createPredicate(validator);
      predicateFn(10);

      expect(validator).toHaveBeenCalledWith(10);
    });

    it("calls all validators in definition", () => {
      const definition = {
        foo: jest.fn().mockReturnValue(true),
        bar: jest.fn().mockReturnValue(true),
      };
      const predicateFn = Guard.createPredicate(definition);
      predicateFn({ foo: 1, bar: 2 });

      expect(definition.foo).toHaveBeenCalledWith(1);
      expect(definition.bar).toHaveBeenCalledWith(2);
    });

    it("returns true when the value is valid", () => {
      const definition = {
        foo: jest.fn().mockReturnValue(true),
        bar: jest.fn().mockReturnValue(true),
      };
      const predicateFn = Guard.createPredicate(definition);

      expect(predicateFn({ foo: 1, bar: 2 })).toBe(true);
    });

    it("returns false when the value is invalid", () => {
      const definition = {
        foo: jest.fn().mockReturnValue(true),
        bar: jest.fn(),
      };
      const predicateFn = Guard.createPredicate(definition);

      expect(predicateFn({ foo: 1, bar: 2 })).toBe(false);
    });
  });
});
