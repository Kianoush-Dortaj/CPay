"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = exports.ValidationResult = void 0;
const bad_request_error_1 = require("../Reponse/bad-request-error");
const internal_error_1 = require("../Reponse/internal-error");
const success_data_response_1 = require("../Reponse/success-data-response");
const success_response_1 = require("../Reponse/success-response");
const express_validator_1 = require("express-validator");
const auto_bind_1 = __importDefault(require("auto-bind"));
class ValidationResult {
    constructor(haveError, errorMessage) {
        this.errorMessage = errorMessage;
        this.haveError = haveError;
    }
}
exports.ValidationResult = ValidationResult;
class BaseController {
    constructor() {
        (0, auto_bind_1.default)(this);
    }
    BadRerquest(res, message) {
        return new bad_request_error_1.BadRequestResponse(message).send(res);
    }
    InternalServerError(res, message) {
        return new internal_error_1.InternalError(message).send(res);
    }
    Ok(res, message) {
        return new success_response_1.SuccessResponse(message).send(res);
    }
    Notfound(res, message = "not Found") {
        return new bad_request_error_1.BadRequestResponse(message).send(res);
    }
    OkObjectResult(res, value, message) {
        return new success_data_response_1.SuccessDataResponse(value, message).send(res);
    }
    OkObjectResultPager(res, value, message) {
        return new success_data_response_1.SuccessDataResponse(value, message).send(res);
    }
    ValidationAction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, express_validator_1.validationResult)(req);
            let messages = [];
            if (!result.isEmpty()) {
                if (messages !== undefined) {
                    let errors = result.array();
                    errors.forEach((element) => {
                        if (messages !== undefined) {
                            messages.push(element.msg);
                        }
                    });
                    return new ValidationResult(true, messages);
                }
            }
            return new ValidationResult(false, []);
        });
    }
}
exports.BaseController = BaseController;
