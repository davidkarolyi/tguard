export class ValidationError extends Error {
  readonly path: Array<string>;
  readonly expectedType: string;

  constructor(message: string, path: Array<string>, expectedType: string) {
    super(`Validation failed: ${message}`);
    this.path = path;
    this.expectedType = expectedType;
  }
}

export class InvalidValueError extends ValidationError {
  constructor(path: Array<string>, expectedType: string) {
    super(
      "Invalid " + getValueDescription(path, expectedType),
      path,
      expectedType
    );
  }
}

export class MissingValueError extends ValidationError {
  constructor(path: Array<string>, expectedType: string) {
    super(
      "Missing " + getValueDescription(path, expectedType),
      path,
      expectedType
    );
  }
}

function getValueDescription(
  path: Array<string>,
  expectedType: string
): string {
  const pathInfo = path.length ? ` at "${path.join(".")}"` : "";
  return `value${pathInfo}, expected type: ${expectedType}`;
}
