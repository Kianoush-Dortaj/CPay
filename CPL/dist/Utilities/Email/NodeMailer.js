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
const nodemailer_1 = __importDefault(require("nodemailer"));
const OperationResult_1 = __importDefault(require("../../core/Operation/OperationResult"));
const setting_enum_1 = require("../../DTO/Sertting/setting-enum");
const RedisRepository_1 = __importDefault(require("../Redis/RedisRepository"));
exports.default = new class NodeMailer {
    constructor() {
    }
    Config() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'cpay.payment.crypto@gmail.com',
                pass: 'k123456789d'
            }
        });
    }
    sendActivationCodeEmail(to, subject, name, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const activatoinLink = yield RedisRepository_1.default.Get(setting_enum_1.SETTING_ENUM.ACTIVATION_LINK);
            const activationLink = `https://adminpay.vercel.app/?email=${to}&hash=${text}`;
            return this.transporter.sendMail({
                to: to,
                subject: subject,
                text: text,
                html: `<h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=${activationLink}> Click here</a>
            </div>`
            }, function (error, info) {
                if (error) {
                    return new OperationResult_1.default(false, error);
                }
                else {
                    return new OperationResult_1.default(true, "Email Sent");
                }
            });
        });
    }
    sendTwofactorCode(to, subject, name, code) {
        return this.transporter.sendMail({
            to: to,
            subject: subject,
            html: `<h1>Twofactor Code</h1>
            <h2>Hello ${name}</h2>
            <p>This is your twofactor Code for Login in TravelBudy Website </p>
            <h1>${code}</h1>
            <p>This code Will be Expire in 2 Minutes </p>
            </div>`
        }, function (error, info) {
            if (error) {
                return new OperationResult_1.default(false, error);
            }
            else {
                return new OperationResult_1.default(true, "Email Sent");
            }
        });
    }
};
