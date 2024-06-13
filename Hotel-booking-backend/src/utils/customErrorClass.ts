class CustomErrorClass extends Error {
  statusCode?: number;

  constructor() {
    super();
    // Set the prototype explicitly to maintain instanceof checks
    Object.setPrototypeOf(this, CustomErrorClass.prototype);
  }

  create(message: string, statusCode: number): this {
    this.message = message;
    this.statusCode = statusCode;
    return this;
  }
}

export default new CustomErrorClass();