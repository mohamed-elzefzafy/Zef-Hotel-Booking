"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomErrorClass extends Error {
    constructor() {
        super();
        // Set the prototype explicitly to maintain instanceof checks
        Object.setPrototypeOf(this, CustomErrorClass.prototype);
    }
    create(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode;
        return this;
    }
}
exports.default = new CustomErrorClass();
