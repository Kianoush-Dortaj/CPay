"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiReponse {
    constructor(status, message, success, result) {
        this.status = status;
        this.message = message;
        this.success = success;
        this.result = result;
    }
    prepare(res, response) {
        return res.status(this.status).json(ApiReponse.sanitize(response));
    }
    send(res) {
        return this.prepare(res, this);
    }
    static sanitize(response) {
        const clone = {};
        Object.assign(clone, response);
        // delete {some_field};
        // delete clone.Status;
        for (const i in clone)
            if (typeof clone[i] === 'undefined')
                delete clone[i];
        return clone;
    }
}
exports.default = ApiReponse;
