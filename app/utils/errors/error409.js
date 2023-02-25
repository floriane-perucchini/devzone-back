// Duplicate Errors
class Error409 extends Error {
  constructor(message) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message || "Error 404: Ressource couldn't be find.";

    this.status = 409;

    this.method = "POST";

    this.type = "duplicate";
  }
}

export default Error409;
