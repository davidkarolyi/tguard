import { guard } from "../src/guard";

describe("guard", () => {
  it("returns a type predicate function", () => {
    const predicateFn = guard(jest.fn());
    expect(typeof predicateFn).toBe("function");
  });

  it("calls single validator with primitive type", () => {
    const validator = jest.fn();
    guard(validator)(10);

    expect(validator).toHaveBeenCalledWith(10);
  });

  it("returns false, when definition is an object, but input is not", () => {
    const definition = { foo: jest.fn() };
    const actual = guard(definition)(10);

    expect(actual).toBe(false);
  });

  it("returns immediatelly after got a falsy validation", () => {
    const definition = { foo: jest.fn(), bar: jest.fn() };
    guard(definition)({});

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
    guard(definition)({ foo: { a: 1, b: 2 }, bar: 3 });

    expect(definition.foo.a).toHaveBeenCalledWith(1);
    expect(definition.foo.b).toHaveBeenCalledWith(2);
    expect(definition.bar).toHaveBeenCalledWith(3);
  });

  it("returns true after validated all fields", () => {
    const definition = {
      foo: jest.fn().mockReturnValue(true),
      bar: jest.fn().mockReturnValue(true),
    };
    const actual = guard(definition)({ foo: 1, bar: 2 });

    expect(actual).toBe(true);
  });
});
