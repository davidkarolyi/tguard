import {
  Guard,
  TArray,
  TNumber,
  TString,
  TAny,
  TBigInt,
  TBoolean,
  TFunction,
  TNull,
  TObject,
  TUndefined,
  TObjectOfShape,
  TOr,
  TAnd,
  TNot,
  TMatch,
  TNumberAsString,
  GenericValidator,
} from "../src";

describe("Exports", () => {
  it("exported all names", () => {
    expect(Guard).toBeDefined();
    expect(TArray).toBeDefined();
    expect(TNumber).toBeDefined();
    expect(TNumberAsString).toBeDefined();
    expect(TString).toBeDefined();
    expect(TAny).toBeDefined();
    expect(TBigInt).toBeDefined();
    expect(TBoolean).toBeDefined();
    expect(TFunction).toBeDefined();
    expect(TNull).toBeDefined();
    expect(TObject).toBeDefined();
    expect(TUndefined).toBeDefined();
    expect(TObjectOfShape).toBeDefined();
    expect(TOr).toBeDefined();
    expect(TAnd).toBeDefined();
    expect(TNot).toBeDefined();
    expect(TMatch).toBeDefined();
    expect(GenericValidator).toBeDefined();
  });
});

describe("Example", () => {
  const TPost = new Guard({
    title: TString,
    body: TString,
  });

  const TUser = new Guard({
    name: TString,
    age: TNumber,
    posts: TArray(TPost),
  });

  it("accepts valid user", () => {
    const user: any = {
      name: "John",
      age: 30,
      posts: [
        { title: "foo", body: "foo bar" },
        { title: "bar", body: "foo bar" },
      ],
    };

    expect(TUser.isValid(user)).toBe(true);
  });

  it("does not accept invalid user", () => {
    const user: any = {
      name: "John",
      age: 30,
      posts: [
        { title: 20, body: "foo bar" },
        { title: "bar", body: "foo bar" },
      ],
    };
    expect(TUser.isValid(user)).toBe(false);
  });

  it("infers types correctly", () => {
    const user = {
      name: "John",
      age: 30,
      posts: [
        { title: "foo", body: "foo bar" },
        { title: "bar", body: "foo bar" },
      ],
    } as unknown as number;

    if (TUser.isValid(user)) {
      expect(user.name).toBe("John");
    } else {
      throw new Error("Not a valid user");
    }
  });
});
