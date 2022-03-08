import { TArray, TInteger, TObject, TString, TStringUUID } from ".";

describe("Example", () => {
  const TPost = TObject({
    id: TStringUUID,
    title: TString,
    body: TString,
  });

  const TUser = TObject({
    id: TStringUUID,
    name: TString,
    age: TInteger,
    posts: TArray(TPost),
  });

  it("accepts valid user", () => {
    const user: any = {
      id: "5d2a0d6c-07b3-423a-a304-0cae6e6375cf",
      name: "John",
      age: 30,
      posts: [
        {
          id: "e923f23d-3876-4519-abf3-06eda05d9be7",
          title: "foo",
          body: "foo bar",
        },
        {
          id: "ccb2a5ae-0a83-417a-ba12-d63a231f7f67",
          title: "bar",
          body: "foo bar",
        },
      ],
    };

    expect(TUser.isValid(user)).toBe(true);
  });

  it("does not accept invalid user", () => {
    const user: any = {
      id: "5d2a0d6c-07b3-423a-a304-0cae6e6375cf",
      name: "John",
      age: 30,
      posts: [
        {
          id: "e923f23d-3876-4519-abf3-06eda05d9be7",
          title: 20, // This is the wronf field
          body: "foo bar",
        },
        {
          id: "ccb2a5ae-0a83-417a-ba12-d63a231f7f67",
          title: "bar",
          body: "foo bar",
        },
      ],
    };
    expect(TUser.isValid(user)).toBe(false);
  });

  it("infers types correctly", () => {
    const user: any = {
      id: "5d2a0d6c-07b3-423a-a304-0cae6e6375cf",
      name: "John",
      age: 30,
      posts: [
        {
          id: "e923f23d-3876-4519-abf3-06eda05d9be7",
          title: "foo",
          body: "foo bar",
        },
        {
          id: "ccb2a5ae-0a83-417a-ba12-d63a231f7f67",
          title: "bar",
          body: "foo bar",
        },
      ],
    } as unknown as number;

    if (TUser.isValid(user)) {
      expect(user.name).toBe("John");
    } else {
      throw new Error("Not a valid user");
    }
  });
});
