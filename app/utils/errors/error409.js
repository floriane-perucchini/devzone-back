// Duplicate Errors
class Error409 extends Error {
  constructor(message) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message || "Error 409: Duplicate content.";

    this.status = 409;

    this.method = "POST";

    this.type = "duplicate";
  }
}

export default Error409;
