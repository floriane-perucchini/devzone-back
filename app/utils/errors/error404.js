// Not found Errors
class Error404 extends Error {
  constructor(message) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message || "Error 404: Ressource couldn't be find.";

    this.status = 404;

    this.method = "GET";

    this.type = "not found";
  }
}

export default Error404;
