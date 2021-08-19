import {
  guard,
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
  TAnd,
  TOr,
  TNot,
  GuardDefinition,
  GuardDefinitionObject,
  Validator,
} from "../src";

describe("Exports", () => {
  it("exported all names", () => {
    expect(guard).toBeDefined();
    expect(TArray).toBeDefined();
    expect(TNumber).toBeDefined();
    expect(TString).toBeDefined();
    expect(TAny).toBeDefined();
    expect(TBigInt).toBeDefined();
    expect(TBoolean).toBeDefined();
    expect(TFunction).toBeDefined();
    expect(TNull).toBeDefined();
    expect(TObject).toBeDefined();
    expect(TUndefined).toBeDefined();
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

  const isPost = guard<Post>({
    title: TString,
    body: TString,
  });

  const isUser = guard<User>({
    name: TString,
    age: TNumber,
    posts: TArray(isPost),
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

    expect(isUser(user)).toBe(true);
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
    expect(isUser(user)).toBe(false);
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

    if (isUser(user)) {
      expect(user.name).toBe("John");
    } else {
      throw new Error("Not a valid user");
    }
  });
});
