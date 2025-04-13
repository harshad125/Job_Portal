class ApplicationError extends Error {
  constructor(param, message, data) {
    super();
    this.param = param;
    this.message = message;
    this.data = data;
  }
}

class UserError extends ApplicationError {
  // constructor() {
  //     super()
  // }
}

export { ApplicationError, UserError };
