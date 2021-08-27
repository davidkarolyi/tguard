import { Tree, TreeOptions } from "../src/tree";

describe("Tree", () => {
  it("can be instantiated from options", () => {
    const options = {
      definition: {},
    };

    const tree = new Tree(options);

    expect(tree.value).toBe(options.definition);
  });

  describe("map", () => {
    describe("when the tree has more than 1 levels", () => {
      it("maps all values in the tree based on the callback", () => {
        const options: TreeOptions<number> = {
          definition: {
            foo: {
              bar: 10,
            },
            bar: 20,
          },
        };

        const tree = new Tree(options);
        expect(tree.map((value) => value + 1).value).toEqual({
          foo: {
            bar: 11,
          },
          bar: 21,
        });
      });
    });

    describe("when the tree has a single node", () => {
      it("converts that single node", () => {
        const options: TreeOptions<number> = {
          definition: 10,
        };

        const tree = new Tree(options);
        expect(tree.map((value) => value + 1).value).toEqual(11);
      });
    });
  });

  describe("find", () => {
    const options: TreeOptions<number> = {
      definition: {
        foo: 40,
        bar: {
          foo: 10,
        },
        baz: 20,
      },
    };
    const tree = new Tree(options);

    it("returns the value, that was first selected by the callback", () => {
      expect(tree.find((value) => value < 30)?.value).toBe(20);
      expect(tree.find((value) => value === 10)?.value).toBe(10);
      expect(tree.find((value) => value === 10)?.value).toBe(10);
    });

    it("returns the path of the result", () => {
      expect(tree.find((value) => value === 10)?.path).toEqual(["bar", "foo"]);
      expect(tree.find((value) => value === 20)?.path).toEqual(["baz"]);
    });

    it("calls the selector callback, until it finds the value", () => {
      const selector = jest.fn();
      tree.find(selector);

      expect(selector).toHaveBeenNthCalledWith(1, 40, ["foo"]);
      expect(selector).toHaveBeenNthCalledWith(2, 20, ["baz"]);
      expect(selector).toHaveBeenNthCalledWith(3, 10, ["bar", "foo"]);
    });

    it("finding the value will stop the traversal", () => {
      const selector = jest.fn().mockReturnValue(true);
      tree.find(selector);

      expect(selector).toHaveBeenCalledTimes(1);
    });
  });
});
