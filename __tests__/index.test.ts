import { TArray, TNumber, TObject, TString } from "../src";

describe("Example", () => {
  const TPost = TObject({
    title: TString,
    body: TString,
  });

  const TUser = TObject({
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
