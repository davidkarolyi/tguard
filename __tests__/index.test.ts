import {
  Guard,
  TArray,
  TGuard,
  TNumber,
  TString,
  TAny,
  TBigInt,
  TBoolean,
  TFunction,
  TNull,
  TObject,
  TUndefined,
  TDefinition,
  TObjectOfShape,
  TAnd,
  TOr,
  TNot,
  IGuard,
  GuardDefinition,
  GuardDefinitionObject,
  Validator,
} from "../src";

describe("Exports", () => {
  it("exported all names", () => {
    expect(Guard).toBeDefined();
    expect(TArray).toBeDefined();
    expect(TGuard).toBeDefined();
    expect(TNumber).toBeDefined();
    expect(TString).toBeDefined();
    expect(TAny).toBeDefined();
    expect(TBigInt).toBeDefined();
    expect(TBoolean).toBeDefined();
    expect(TFunction).toBeDefined();
    expect(TNull).toBeDefined();
    expect(TObject).toBeDefined();
    expect(TUndefined).toBeDefined();
    expect(TDefinition).toBeDefined();
    expect(TObjectOfShape).toBeDefined();
    expect(TAnd).toBeDefined();
    expect(TOr).toBeDefined();
    expect(TNot).toBeDefined();
  });
});

describe("Example", () => {
  interface User {
    name: string;
    age: number;
    posts: Post[];
  }

  interface Post {
    title: string;
    body: string;
  }

  const PostGuard = new Guard<Post>({
    title: TString,
    body: TString,
  });

  const UserGuard = new Guard<User>({
    name: TString,
    age: TNumber,
    posts: TArray(TGuard(PostGuard)),
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

    expect(UserGuard.accepts(user)).toBe(true);
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
    expect(UserGuard.accepts(user)).toBe(false);
  });
});
