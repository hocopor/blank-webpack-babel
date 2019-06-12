class UnexpectedTypeError extends Error {
  constructor(message, type, expectedType) {
    super(message);
    this.type = type;
    this.expectedType = expectedType;
  }
}
