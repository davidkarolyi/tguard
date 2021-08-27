export type TreeDefinition<T> = { [fieldName: string]: TreeDefinition<T> } | T;
export type TreeOptions<T> = {
  definition: TreeDefinition<T>;
  isLeafNode?: (value: TreeDefinition<T>) => value is T;
};
export type NodeDescriptor<T> = {
  node: TreeDefinition<T>;
  path: Array<string>;
};

export class Tree<T> {
  readonly value: TreeDefinition<T>;
  readonly isLeafNode: (value: TreeDefinition<T>) => value is T;
  private readonly defaultIsLeafNode = (value: TreeDefinition<T>): value is T =>
    typeof value !== "object";

  constructor(options: TreeOptions<T>) {
    this.value = options.definition;
    this.isLeafNode = options.isLeafNode || this.defaultIsLeafNode;
  }

  map<R>(
    callback: (value: T) => R,
    isLeafNode?: (value: TreeDefinition<R>) => value is R
  ): Tree<R> {
    if (this.isLeafNode(this.value))
      return new Tree({ definition: callback(this.value as T), isLeafNode });

    const definition: TreeDefinition<R> = {};

    for (const key in this.value) {
      if (this.isLeafNode(this.value[key]))
        definition[key] = callback(this.value[key] as T);
      else {
        const subTree = new Tree({
          definition: this.value[key],
          isLeafNode: this.isLeafNode,
        });
        definition[key] = subTree.map(callback).value;
      }
    }

    return new Tree<R>({
      definition,
      isLeafNode,
    });
  }

  find(selector: (value: T, path: Array<string>) => boolean) {
    const toDiscover: Array<{
      node: TreeDefinition<T>;
      path: Array<string>;
    }> = [{ node: this.value, path: [] }];

    while (toDiscover.length) {
      const { node, path } = toDiscover.shift()!;
      if (this.isLeafNode(node)) {
        if (selector(node, path)) return { value: node, path };
        continue;
      }
      for (const key in node) {
        toDiscover.push({ node: node[key], path: [...path, key] });
      }
    }
  }
}
